import { AbstractAdvice } from "../../abstract-advice";
import { IMetadata } from "~/protocols/metadata";

export class After extends AbstractAdvice {
	callSpecificAdvice(metadata: IMetadata, proceed: () => void) {
		proceed();
		this.advice(metadata);
	}
}
