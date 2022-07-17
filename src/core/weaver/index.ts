import {
	IAspect,
	IAdvice,
	IJoinpoint,
	IWeaver,
	IRegistry,
	IMatcher,
} from "~/protocols";

export class Weaver implements IWeaver {
	constructor(
		private readonly registry: IRegistry,
		private readonly joinpoints: Record<IJoinpoint.Name, IJoinpoint>,
		private readonly adviceBuilders: Record<
			IAdvice.Name,
			(advice: Function) => IAdvice
		>,
		private readonly matcher: IMatcher
	) {}
	private aspectAdvices = new WeakMap<IAspect, IAdvice[]>();

	public weaveNewAspect(aspect: IAspect) {
		this.registry.getTargets().forEach((target) => {
			this.weaveAspectForTarget(aspect, target);
		});
	}

	public weaveNewTarget(target: Function) {
		this.registry.getAspects().forEach((aspect) => {
			this.weaveAspectForTarget(aspect, target);
		});
	}

	private getAdvicesForAspect(aspect: IAspect): IAdvice[] {
		const cachedAdvices = this.aspectAdvices.get(aspect);
		if (cachedAdvices) return cachedAdvices;

		const newAdvices: IAdvice[] = [];
		this.aspectAdvices.set(aspect, newAdvices);

		Object.entries(this.adviceBuilders).forEach(([adviceName, builder]) => {
			const advice: Function = aspect[adviceName];

			if (!advice) return;

			newAdvices.push(builder(advice.bind(aspect)));
		});

		return newAdvices;
	}

	private weaveAspectForTarget(aspect: IAspect, classTarget: Function) {
		if (
			!this.matcher.match(
				classTarget.prototype.constructor.name,
				aspect.pointcuts.className
			)
		)
			return;

		const joinpoint = this.joinpoints[aspect.pointcuts.joinpointType];
		const propertyNames = joinpoint.getProperties(classTarget);
		const advices = this.getAdvicesForAspect(aspect);
		propertyNames.forEach((propertyName) => {
			if (
				this.matcher.match(
					propertyName,
					aspect.pointcuts.methodOrProperty
				)
			) {
				const joinpointMethod = joinpoint.getJoinpointMethod(
					classTarget,
					propertyName
				);
				advices.forEach((advice) => {
					advice.weave(joinpointMethod);
				});
			}
		});
	}
}
