import { Around } from "~/core/advice";

const makeSut = () => {
	const adviceMethod = jest.fn();
	const proceed = jest.fn();
	const sut = new Around(adviceMethod);

	return {
		sut,
		adviceMethod,
		proceed,
	};
};

const metadata: any = { interrupted: false };

describe("Unit test for Around Advice Class", () => {
	describe("test callSpecificAdvice function", () => {
		it("should call advice method", () => {
			const { sut, adviceMethod, proceed } = makeSut();
			sut.callSpecificAdvice(metadata, proceed);
			expect(adviceMethod).toHaveBeenCalledWith(metadata);
		});

		it("should call proceed method if advice does not proceed", () => {
			const { sut, proceed } = makeSut();
			sut.callSpecificAdvice(metadata, proceed);
			expect(proceed).toHaveBeenCalledWith();
		});

		it("should not call proceed twice if advice proceeds", () => {
			const { sut, proceed, adviceMethod } = makeSut();
			let hasProceeded = false;
			adviceMethod.mockImplementationOnce(() => {
				metadata.proceed();
				hasProceeded = true;
			});
			sut.callSpecificAdvice(metadata, proceed);

			expect(proceed).toHaveBeenCalledOnce();
			expect(hasProceeded).toBe(true);
		});
	});
});
