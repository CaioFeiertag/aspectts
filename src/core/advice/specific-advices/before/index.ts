import { AbstractAdvice } from "../../abstract-advice";
import { IMetadata } from "~/protocols/metadata";

export class Before extends AbstractAdvice {
	callSpecificAdvice(metadata: IMetadata, proceed: () => void) {
		this.advice(metadata);
		proceed();
	}
}
