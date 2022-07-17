import { AbstractAdvice } from "../../abstract-advice";
import { IMetadata } from "~/protocols/metadata";

export class OnThrow extends AbstractAdvice {
	callSpecificAdvice(metadata: IMetadata, proceed: () => void) {
		try {
			proceed();
		} catch (e) {
			metadata.error = e;
			this.advice(metadata);
		}
	}
}
