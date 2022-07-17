import { IAspect } from "./aspect";

export interface IRegistry {
	addAspect(aspect: IAspect): void;
	addTarget(target: any): void;
	getAspects(): IAspect[];
	getTargets(): any[];
}
