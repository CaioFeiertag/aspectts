import { Matcher } from "~/core/matcher";

const makeSut = () => {
	const sut = new Matcher();

	return {
		sut,
	};
};

describe("Unit test for Matcher Class", () => {
	const className = "MyClass";

	describe("test match method", () => {
		it("should return true if undefined rule has been received", () => {
			const { sut } = makeSut();

			const result = sut.match(className, undefined);

			expect(result).toBe(true);
		});

		it("should return true if string matches regex rule that has been received", () => {
			const { sut } = makeSut();

			const result = sut.match(className, /My.*/);

			expect(result).toBe(true);
		});

		it("should return false if string does not match regex rule that has been received", () => {
			const { sut } = makeSut();

			const result = sut.match("AnotherClass", /My.*/);

			expect(result).toBe(false);
		});

		it("should return true if empty array has been received", () => {
			const { sut } = makeSut();

			const result = sut.match(className, []);

			expect(result).toBe(true);
		});

		it("should return true if string is included inside array of the rule that has been received", () => {
			const { sut } = makeSut();

			const result = sut.match("className", [className]);

			expect(result).toBe(false);
		});

		it("should return false if string is not included inside array of the rule that has been received", () => {
			const { sut } = makeSut();

			const result = sut.match("AnotherClass", [className]);

			expect(result).toBe(false);
		});
	});
});
