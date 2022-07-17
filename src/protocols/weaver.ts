import { IAspect } from "~/protocols";
export interface IWeaver {
	weaveNewAspect(aspect: IAspect): void;
	weaveNewTarget(target: Object): void;
}
