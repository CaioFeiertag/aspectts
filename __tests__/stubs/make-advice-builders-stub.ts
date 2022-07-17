import { IAdvice } from "~/protocols";

const makeAdviceStub = (): IAdvice => {
	return {
		weave: jest.fn(),
	};
};

export function makeAdviceBuildersStub(): Record<IAdvice.Name, () => IAdvice> {
	return {
		before: () => makeAdviceStub(),
		around: () => makeAdviceStub(),
		after: () => makeAdviceStub(),
		onThrow: () => makeAdviceStub(),
	};
}
