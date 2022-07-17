import { makeMain } from "~/factories/make-main";

const makeSut = () => {
	const sut = makeMain();

	return {
		sut,
	};
};

describe("Integration test for registering process", () => {
	const aspects: any[] = ["aspect1", "aspect2"];
	const targets: any[] = ["target1", "target2"];

	it("should add aspects to registry when calling registerAspects on main", () => {
		const { sut } = makeSut();

		sut.registerAspects(aspects);

		expect(sut["registry"]["aspects"]).toStrictEqual(new Set(aspects));
	});

	it("should add targets to registry when calling registerTargets on main", () => {
		const { sut } = makeSut();

		sut.registerTargets(targets);

		expect(sut["registry"]["targets"]).toStrictEqual(new Set(targets));
	});
});
