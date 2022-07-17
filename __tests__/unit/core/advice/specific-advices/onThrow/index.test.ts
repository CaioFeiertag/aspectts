import { OnThrow } from "~/core/advice";

const makeSut = () => {
	const adviceMethod = jest.fn();
	const proceed = jest.fn();
	const sut = new OnThrow(adviceMethod);

	return {
		sut,
		adviceMethod,
		proceed,
	};
};

const metadata: any = { interrupted: false };

describe("Unit test for OnThrow Advice Class", () => {
	describe("test callSpecificAdvice function", () => {
		it("should call proceed method", () => {
			const { sut, proceed } = makeSut();
			sut.callSpecificAdvice(metadata, proceed);
			expect(proceed).toHaveBeenCalledWith();
		});

		it("should not call advice method if proceed execution does not throw exception", () => {
			const { sut, proceed, adviceMethod } = makeSut();
			sut.callSpecificAdvice(metadata, proceed);
			expect(adviceMethod).not.toHaveBeenCalled();
		});
		it("should call advice if proceeds throws and set error on metadata", () => {
			const { sut, adviceMethod, proceed } = makeSut();
			const error = new Error("test error");
			proceed.mockImplementationOnce(() => {
				throw error;
			});
			sut.callSpecificAdvice(metadata, proceed);

			expect(adviceMethod).toHaveBeenCalledWith(metadata);
			expect(metadata.error).toBe(error);
		});
	});
});
