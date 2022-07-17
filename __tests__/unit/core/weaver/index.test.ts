import { Weaver } from "~/core/weaver";
import { makeRegistryStub } from "../../../stubs/make-registry-stub";
import { makeJoinpointsStub } from "../../../stubs/make-joinpoints-stub";
import { makeAdviceBuildersStub } from "../../../stubs/make-advice-builders-stub";
import { makeMatcherStub } from "../../../stubs/make-matcher-stub";
import { createAspect } from "../../../helpers/create-aspect";
import { createBasicClass } from "../../../helpers/create-class";

const makeSut = () => {
	const stubs = {
		registry: makeRegistryStub(),
		joinpoint: makeJoinpointsStub(),
		adviceBuilders: makeAdviceBuildersStub(),
		matcher: makeMatcherStub(),
	};
	const sut = new Weaver(
		stubs.registry,
		stubs.joinpoint,
		stubs.adviceBuilders,
		stubs.matcher
	);

	stubs.registry.getAspects = jest.fn().mockReturnValue([aspect]);
	stubs.registry.getTargets = jest.fn().mockReturnValue([target]);

	return {
		sut,
		stubs,
	};
};

const aspect = createAspect(true);
const target = createBasicClass();

describe("Unit test for Weaver Class", () => {
	describe("test weaveNewAspect method", () => {
		it("should call get targets from registry", () => {
			const { sut, stubs } = makeSut();
			sut.weaveNewAspect(aspect);

			expect(stubs.registry.getTargets).toHaveBeenCalledWith();
		});
		it("should call weave aspect for target for each pair aspect-target pair", () => {
			const { sut } = makeSut();
			sut["weaveAspectForTarget"] = jest.fn();

			sut.weaveNewAspect(aspect);

			expect(sut["weaveAspectForTarget"]).toHaveBeenCalledWith(
				aspect,
				target
			);
		});
	});

	describe("test weaveNewTarget method", () => {
		it("should call get aspects from registry", () => {
			const { sut, stubs } = makeSut();

			sut.weaveNewTarget(target);

			expect(stubs.registry.getAspects).toHaveBeenCalledWith();
		});
		it("should call weave aspect for target for each pair aspect-target pair", () => {
			const { sut } = makeSut();

			sut["weaveAspectForTarget"] = jest.fn();

			sut.weaveNewTarget(target);

			expect(sut["weaveAspectForTarget"]).toHaveBeenCalledWith(
				aspect,
				target
			);
		});
	});

	describe("test getAdvicesForAspect method", () => {
		it("should create advices and save to cache", () => {
			const { sut, stubs } = makeSut();

			const aspect = createAspect();
			const mockBind = jest.fn().mockReturnValue("before");
			aspect.before = { bind: mockBind } as any;
			stubs.adviceBuilders.before = jest.fn().mockReturnValue("advice");

			const result = sut["getAdvicesForAspect"](aspect);

			expect(stubs.adviceBuilders.before).toHaveBeenCalledWith("before");
			expect(mockBind).toHaveBeenCalledWith(aspect);
			expect(sut["aspectAdvices"].get(aspect)).toEqual(["advice"]);
			expect(result).toEqual(["advice"]);
		});

		it("should return from cache", () => {
			const { sut } = makeSut();

			const aspect = createAspect(true);
			sut["aspectAdvices"].set(aspect, ["cached-advice"] as any);
			const result = sut["getAdvicesForAspect"](aspect);

			expect(result).toEqual(["cached-advice"]);
		});
	});
});
