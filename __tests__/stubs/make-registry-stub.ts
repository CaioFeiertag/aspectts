import { IRegistry } from "~/protocols";

export function makeRegistryStub(): IRegistry {
	return {
		addAspect: jest.fn(),
		addTarget: jest.fn(),
		getAspects: jest.fn(),
		getTargets: jest.fn(),
	};
}
