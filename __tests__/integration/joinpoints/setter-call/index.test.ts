import { makeMain } from "~/factories/make-main";
import {
	createAspect,
	getAdviceWrapping,
	createClassWithDifferentProperties,
} from "../../../helpers";

const aspect = createAspect(true);
aspect.pointcuts.joinpointType = "SetterCall";

const makeSut = () => {
	const sut = makeMain();
	sut["registry"]["aspects"] = new Set([aspect]);
	return {
		sut,
	};
};

describe("Integration test for weaving getter call joinpoint", () => {
	it("should properly weave joinpoint for target pointcut", () => {
		const { sut } = makeSut();
		const target = class {
			set name(_: string) {}
		};
		sut.registerTargets([target]);

		expect(getAdviceWrapping(target, "name", "SetterCall")).toBeDefined();
	});

	it("should not weave other joinpoints that matches pointcuts rule", () => {
		const { sut } = makeSut();
		const target = createClassWithDifferentProperties();
		sut.registerTargets([target]);

		expect(
			getAdviceWrapping(target, "method", "MethodCall")
		).not.toBeDefined();
		expect(
			getAdviceWrapping(target, "staticMethod", "StaticMethodCall")
		).not.toBeDefined();
		expect(
			getAdviceWrapping(target, "name", "GetterCall")
		).not.toBeDefined();
	});
});
