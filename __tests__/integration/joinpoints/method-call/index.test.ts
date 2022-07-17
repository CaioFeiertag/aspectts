import { makeMain } from "~/factories/make-main";
import {
	createAspect,
	createBasicClass,
	getAdviceWrapping,
	createClassWithDifferentProperties,
} from "../../../helpers";

const aspect = createAspect(true);

const makeSut = () => {
	const sut = makeMain();
	sut["registry"]["aspects"] = new Set([aspect]);
	return {
		sut,
	};
};

describe("Integration test for weaving method call joinpoint", () => {
	it("should properly weave joinpoint for target pointcut", () => {
		const { sut } = makeSut();
		const target = createBasicClass();
		sut["registry"]["aspects"] = new Set([aspect]);
		sut.registerTargets([target]);

		expect(getAdviceWrapping(target, "method", "MethodCall")).toBeDefined();
	});

	it("should not weave other joinpoints that matches pointcuts rule", () => {
		const { sut } = makeSut();
		const target = createClassWithDifferentProperties();
		sut.registerTargets([target]);

		expect(
			getAdviceWrapping(target, "staticMethod", "StaticMethodCall")
		).not.toBeDefined();
		expect(
			getAdviceWrapping(target, "name", "GetterCall")
		).not.toBeDefined();
		expect(
			getAdviceWrapping(target, "name", "SetterCall")
		).not.toBeDefined();
	});
});
