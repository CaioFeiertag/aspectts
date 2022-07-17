import { Registry } from "~/core/registry";
import { IAspect } from "~/protocols";

const makeSut = () => {
	const sut = new Registry();

	return {
		sut,
	};
};

const aspects: any[] = ["aspect1", "aspect2"];
const targets: any[] = ["targets1", "targets2"];

describe("Unit test for Registry Class", () => {
	describe("test get aspects method", () => {
		it("should return empty array if any aspects has been registered", () => {
			const { sut } = makeSut();

			const aspectsReturned = sut.getAspects();

			expect(aspectsReturned).toStrictEqual([]);
		});
		it("should return the aspects registered", () => {
			const { sut } = makeSut();

			sut["aspects"] = new Set(aspects);

			const aspectsReturned = sut.getAspects();

			expect(aspectsReturned).toStrictEqual(aspects);
		});
	});

	describe("test add aspects method", () => {
		it("should add aspect to empty set", () => {
			const { sut } = makeSut();

			const aspectSet = new Set<IAspect>();
			sut["aspects"] = aspectSet;
			const aspect: any = "new-aspect";

			sut.addAspect(aspect);

			expect(aspectSet).toContainEqual(aspect);
		});
	});

	describe("test get targets method", () => {
		it("should return empty array if any targets has been registered", () => {
			const { sut } = makeSut();

			const targetsReturned = sut.getTargets();

			expect(targetsReturned).toStrictEqual([]);
		});
		it("should return the targets registered", () => {
			const { sut } = makeSut();

			sut["targets"] = new Set(targets);

			const targetsReturned = sut.getTargets();

			expect(targetsReturned).toStrictEqual(targets);
		});
	});
});
