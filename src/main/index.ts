import { IAspect, IRegistry, IWeaver } from "../protocols";

export class AspectTS {
	constructor(
		private readonly registry: IRegistry,
		private readonly weaver: IWeaver
	) {}

	public registerAspects(aspects: IAspect[]): void {
		try {
			aspects.forEach((aspect) => {
				this.registry.addAspect(aspect);
				this.weaver.weaveNewAspect(aspect);
			});
		} catch (e) {
			console.error(
				"[AspectTSError]: Internal error, something went wrong during the register of aspects."
			);
			console.error(e);
		}
	}

	public registerTargets(targets: any[]): void {
		try {
			targets.forEach((target) => {
				this.registry.addTarget(target);
				this.weaver.weaveNewTarget(target);
			});
		} catch (e) {
			console.error(
				"[AspectTSError]: Internal error, something went wrong during the register of targets."
			);
			console.error(e);
		}
	}
}
