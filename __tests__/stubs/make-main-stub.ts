import { IAspectTS } from "~/protocols/aspect-ts";

export function makeMainStub(): IAspectTS {
	return {
		registerAspects: jest.fn(),
		registerTargets: jest.fn(),
	};
}
