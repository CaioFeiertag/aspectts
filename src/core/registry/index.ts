import { IAspect } from "../../protocols/aspect";
import { IRegistry } from "../../protocols/registry";

export class Registry implements IRegistry {
	private aspects: Set<IAspect> = new Set<IAspect>();
	private targets: Set<any> = new Set<any>();

	public addAspect(aspect: IAspect) {
		this.aspects.add(aspect);
	}

	public addTarget(target: any) {
		this.targets.add(target);
	}

	public getAspects(): IAspect[] {
		return Array.from(this.aspects.values());
	}

	public getTargets(): any[] {
		return Array.from(this.targets.values());
	}
}
