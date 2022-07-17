import { AbstractAdvice } from "../../abstract-advice";
import { IMetadata } from "~/protocols/metadata";

export class Around extends AbstractAdvice {
	callSpecificAdvice(metadata: IMetadata, proceed: () => void) {
		let hasProceeded = false;

		metadata.proceed = () => {
			proceed();
			hasProceeded = true;
		};

		this.advice(metadata);

		if (!hasProceeded) proceed();
	}
}
