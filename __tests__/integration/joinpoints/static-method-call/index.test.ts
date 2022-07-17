import { makeMain } from "~/factories/make-main";
import {
	createAspect,
	getAdviceWrapping,
	createClassWithDifferentProperties,
} from "../../../helpers";

const aspect = createAspect(true);
aspect.pointcuts.joinpointType = "StaticMethodCall";

const makeSut = () => {
	const sut = makeMain();
	sut["registry"]["aspects"] = new Set([aspect]);
	return {
		sut,
	};
};

describe("Integration test for weaving static method call joinpoint", () => {
	it("should properly weave joinpoint for target pointcut", () => {
		const { sut } = makeSut();
		const target = class {
			static staticMethod() {}
		};
		sut.registerTargets([target]);

		expect(
			getAdviceWrapping(target, "staticMethod", "StaticMethodCall")
		).toBeDefined();
	});

	it("should not weave other joinpoints that matches pointcuts rule", () => {
		const { sut } = makeSut();
		const target = createClassWithDifferentProperties();
		sut.registerTargets([target]);

		expect(
			getAdviceWrapping(target, "method", "MethodCall")
		).not.toBeDefined();
		expect(
			getAdviceWrapping(target, "name", "GetterCall")
		).not.toBeDefined();
		expect(
			getAdviceWrapping(target, "name", "SetterCall")
		).not.toBeDefined();
	});
});
