import { Before, After, Around, OnThrow } from "../core/advice";
import { IAdvice } from "../protocols";

export function makeAdviceBuilders() {
	return {
		before: (advice: IAdvice.Method) => new Before(advice),
		after: (advice: IAdvice.Method) => new After(advice),
		around: (advice: IAdvice.Method) => new Around(advice),
		onThrow: (advice: IAdvice.Method) => new OnThrow(advice),
	};
}
