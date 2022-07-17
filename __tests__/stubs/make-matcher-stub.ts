import { IMatcher } from "~/protocols";

export function makeMatcherStub(): IMatcher {
	return {
		match: jest.fn(),
	};
}
