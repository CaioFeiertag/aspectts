import { IAspect } from "./aspect";
export interface IAspectTS {
	registerTargets: (targets: any[]) => void;
	registerAspects: (aspects: IAspect[]) => void;
}
