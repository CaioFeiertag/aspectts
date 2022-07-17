import { Before } from "~/core/advice";

const makeSut = () => {
	const adviceMethod = jest.fn();
	const proceed = jest.fn();
	const sut = new Before(adviceMethod);

	return {
		sut,
		adviceMethod,
		proceed,
	};
};

const metadata: any = { interrupted: false };

describe("Unit test for Before Advice Class", () => {
	describe("test callSpecificAdvice function", () => {
		it("should call advice method", () => {
			const { sut, adviceMethod, proceed } = makeSut();
			sut.callSpecificAdvice(metadata, proceed);
			expect(adviceMethod).toHaveBeenCalledWith(metadata);
		});

		it("should call proceed method", () => {
			const { sut, adviceMethod, proceed } = makeSut();
			sut.callSpecificAdvice(metadata, proceed);
			expect(proceed).toHaveBeenCalledWith();
		});
		it("should call advice before proceed", () => {
			const { sut, adviceMethod, proceed } = makeSut();
			sut.callSpecificAdvice(metadata, proceed);

			expect(adviceMethod).toHaveBeenCalledBefore(proceed);
		});
	});
});
