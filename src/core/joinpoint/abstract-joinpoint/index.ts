import { IAdvice, IJoinpoint, IMetadata } from "~/protocols";
export abstract class AbstractJoinpoint implements IJoinpoint {
	protected abstract getSpecificJoinpointMethod(
		classTarget: Function,
		propertyName: string
	): IAdvice.PreparedJoinpointMethod;
	abstract getProperties(classTarget: Object): string[];
	protected abstract replaceJoinpointMethod(
		classTarget: Function,
		propertyName: string
	): void;

	public getJoinpointMethod(classTarget: Function, propertyName: string) {
		const joinpointMethod = this.getSpecificJoinpointMethod(
			classTarget,
			propertyName
		);
		if (joinpointMethod._advices_wrapping) {
			return joinpointMethod;
		}
		this.replaceJoinpointMethod(classTarget, propertyName);
		return this.getSpecificJoinpointMethod(classTarget, propertyName);
	}

	private getMetadata(
		target: Function,
		methodName: string,
		args: any[]
	): IMetadata {
		return {
			className: target.prototype.constructor.name,
			methodName,
			arguments: args,
			interrupted: false,
		};
	}

	protected buildJoinpointForAdvices(
		classTarget: Function,
		propertyName: string
	): IAdvice.PreparedJoinpointMethod {
		const self = this;
		const originalMethod = this.getSpecificJoinpointMethod(
			classTarget,
			propertyName
		);
		const buildedFunction = function (...args: any[]) {
			const metadata = self.getMetadata(classTarget, propertyName, args);
			self.getSpecificJoinpointMethod(
				classTarget,
				propertyName
			)._advices_wrapping(metadata, this);
			return metadata.result;
		};

		buildedFunction._advices_wrapping = (
			metadata: IMetadata,
			context: Function
		) => {
			if (metadata.interrupted) {
				return;
			}
			metadata.result = originalMethod.apply(context, metadata.arguments);
		};

		return buildedFunction;
	}
}
