import { IWeaver } from "../../src/protocols";

export function makeWeaverStub(): IWeaver {
	return {
		weaveNewAspect: jest.fn(),
		weaveNewTarget: jest.fn(),
	};
}
