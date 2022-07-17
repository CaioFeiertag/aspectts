import { buildAdvisedDecorator } from "~/helpers/advised-decorator";
import { makeMainStub } from "../../../stubs/make-main-stub";

const makeSut = () => {
	const stubs = {
		main: makeMainStub(),
	};
	const sut = buildAdvisedDecorator(stubs.main);

	return {
		sut,
		stubs,
	};
};

describe("Unit test AdvisedDecorator", () => {
	it("should build a class decorator", () => {
		const { sut } = makeSut();

		const result = sut();

		expect(typeof result).toBe("function");
		console.log(result);
	});

	it("the class decorator builded should call registerTarget for the class", () => {
		const { sut, stubs } = makeSut();

		const decorator = sut();
		const target: any = "target";
		decorator(target);
		expect(stubs.main.registerTargets).toHaveBeenCalledWith([target]);
	});
});
