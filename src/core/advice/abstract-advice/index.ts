import { IMetadata, IAdvice } from "~/protocols";

export abstract class AbstractAdvice implements IAdvice {
	constructor(protected advice: IAdvice.Method) {}

	abstract callSpecificAdvice(metadata: IMetadata, proceed: () => void): void;

	private buildNewWrappingMethod(
		currentWrappingMethod: IAdvice.WrappingFunction
	) {
		return (metadata: IMetadata, context: Object) => {
			if (metadata.interrupted) {
				return;
			}

			const proceed = () => currentWrappingMethod(metadata, context);

			metadata.proceed = undefined;

			this.callSpecificAdvice(metadata, proceed);
		};
	}
	weave(joinpointMethod: IAdvice.PreparedJoinpointMethod) {
		const currentWrappingMethod = joinpointMethod._advices_wrapping;

		joinpointMethod._advices_wrapping = this.buildNewWrappingMethod(
			currentWrappingMethod
		);
	}
}
