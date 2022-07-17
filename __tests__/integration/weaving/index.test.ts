import { makeMain } from "~/factories/make-main";
import { createAspect, createBasicClass } from "../../helpers/";
const makeSut = () => {
	const sut = makeMain();

	return {
		sut,
	};
};

const getAdviceWrapping = (target: Function) => {
	return target.prototype.method._advices_wrapping;
};

describe("Integration test for weaving process", () => {
	it("should weave matching target", () => {
		const { sut } = makeSut();
		const aspect = createAspect(true);
		const target = createBasicClass();
		sut["registry"]["aspects"] = new Set([aspect]);
		sut.registerTargets([target]);

		expect(getAdviceWrapping(target)).toBeDefined();
	});

	it("should not weave targets that does not match", () => {
		const { sut } = makeSut();
		const aspect = createAspect(true);
		aspect.pointcuts.className = ["AnotherClass"];
		const target = createBasicClass();
		sut["registry"]["aspects"] = new Set([aspect]);
		sut.registerTargets([target]);

		expect(getAdviceWrapping(target)).not.toBeDefined();
	});

	it("should replace wrapping for before advice", () => {
		const { sut } = makeSut();
		const aspect = createAspect(true);
		const target = createBasicClass();

		const previous: any = "mocked-method";
		(target.prototype.method as any)._advices_wrapping = previous;
		sut["registry"]["targets"] = new Set([target]);

		sut.registerAspects([aspect]);

		expect(getAdviceWrapping(target)).not.toBe(previous);
	});

	it("should replace wrapping for after advice", () => {
		const { sut } = makeSut();
		const aspect = createAspect();
		aspect.after = () => {};
		const target = createBasicClass();

		const previous: any = "mocked-method";
		(target.prototype.method as any)._advices_wrapping = previous;
		sut["registry"]["targets"] = new Set([target]);

		sut.registerAspects([aspect]);

		expect(getAdviceWrapping(target)).not.toBe(previous);
	});

	it("should replace wrapping for around advice", () => {
		const { sut } = makeSut();
		const aspect = createAspect();
		aspect.around = () => {};
		const target = createBasicClass();

		const previous: any = "mocked-method";
		(target.prototype.method as any)._advices_wrapping = previous;
		sut["registry"]["targets"] = new Set([target]);

		sut.registerAspects([aspect]);

		expect(getAdviceWrapping(target)).not.toBe(previous);
	});

	it("should replace wrapping for onThrow advice", () => {
		const { sut } = makeSut();
		const aspect = createAspect();
		aspect.onThrow = () => {};
		const target = createBasicClass();

		const previous: any = "mocked-method";
		(target.prototype.method as any)._advices_wrapping = previous;
		sut["registry"]["targets"] = new Set([target]);

		sut.registerAspects([aspect]);

		expect(getAdviceWrapping(target)).not.toBe(previous);
	});
});
