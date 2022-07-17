import { AspectTS } from "../../../src/main";
import { makeRegistryStub } from "../../stubs/make-registry-stub";
import { makeWeaverStub } from "../../stubs/make-weaver-stub";

const makeSut = () => {
	const stubs = {
		registry: makeRegistryStub(),
		weaver: makeWeaverStub(),
	};

	const sut = new AspectTS(stubs.registry, stubs.weaver);

	return {
		sut,
		stubs,
	};
};

describe("Unit test for main AspectTS module", () => {
	const consoleSpy = jest.spyOn(console, "error").mockImplementation();
	const testError = new Error("test error");
	const aspects: any[] = ["aspect1", "aspect2"];
	const targets: any[] = ["target1", "target2"];
	beforeEach(() => {
		consoleSpy.mockClear();
	});

	describe("test registerAspects method", () => {
		it("should call addAspect of registry for each call", () => {
			const { sut, stubs } = makeSut();

			sut.registerAspects(aspects);

			expect(stubs.registry.addAspect).toHaveBeenCalledTimes(2);
			expect(stubs.registry.addAspect).toHaveBeenNthCalledWith(
				1,
				aspects[0]
			);
			expect(stubs.registry.addAspect).toHaveBeenNthCalledWith(
				2,
				aspects[1]
			);
		});
		it("should call weaveNewAspect of weaver for each call", () => {
			const { sut, stubs } = makeSut();

			sut.registerAspects(aspects);

			expect(stubs.weaver.weaveNewAspect).toHaveBeenCalledTimes(2);
			expect(stubs.weaver.weaveNewAspect).toHaveBeenNthCalledWith(
				1,
				aspects[0]
			);
			expect(stubs.weaver.weaveNewAspect).toHaveBeenNthCalledWith(
				2,
				aspects[1]
			);
		});

		it("should not throw error if it occurs", () => {
			const { sut, stubs } = makeSut();

			jest.spyOn(stubs.weaver, "weaveNewAspect").mockImplementation(
				() => {
					throw testError;
				}
			);

			expect(() => sut.registerAspects(aspects)).not.toThrow();
		});

		it("should show error on console instead of throwing it", () => {
			const { sut, stubs } = makeSut();

			jest.spyOn(stubs.weaver, "weaveNewAspect").mockImplementation(
				() => {
					throw testError;
				}
			);

			sut.registerAspects(aspects);

			expect(console.error).toBeCalledTimes(2);
			expect(console.error).toHaveBeenNthCalledWith(
				1,
				"[AspectTSError]: Internal error, something went wrong during the register of aspects."
			);
			expect(console.error).toHaveBeenLastCalledWith(testError);
		});
	});

	describe("test registerTargets method", () => {
		it("should call addTarget of registry for each call", () => {
			const { sut, stubs } = makeSut();

			sut.registerTargets(aspects);

			expect(stubs.registry.addTarget).toHaveBeenCalledTimes(2);
			expect(stubs.registry.addTarget).toHaveBeenNthCalledWith(
				1,
				aspects[0]
			);
			expect(stubs.registry.addTarget).toHaveBeenNthCalledWith(
				2,
				aspects[1]
			);
		});
		it("should call weaveNewTarget of weaver for each call", () => {
			const { sut, stubs } = makeSut();

			sut.registerTargets(aspects);

			expect(stubs.weaver.weaveNewTarget).toHaveBeenCalledTimes(2);
			expect(stubs.weaver.weaveNewTarget).toHaveBeenNthCalledWith(
				1,
				aspects[0]
			);
			expect(stubs.weaver.weaveNewTarget).toHaveBeenNthCalledWith(
				2,
				aspects[1]
			);
		});

		it("should not throw error if it occurs", () => {
			const { sut, stubs } = makeSut();

			jest.spyOn(stubs.weaver, "weaveNewTarget").mockImplementation(
				() => {
					throw testError;
				}
			);

			expect(() => sut.registerTargets(targets)).not.toThrow();
		});

		it("should show error on console instead of throwing it", () => {
			const { sut, stubs } = makeSut();

			jest.spyOn(stubs.weaver, "weaveNewTarget").mockImplementation(
				() => {
					throw testError;
				}
			);

			sut.registerTargets(aspects);

			expect(console.error).toBeCalledTimes(2);
			expect(console.error).toHaveBeenNthCalledWith(
				1,
				"[AspectTSError]: Internal error, something went wrong during the register of targets."
			);
			expect(console.error).toHaveBeenLastCalledWith(testError);
		});
	});
});
