import { AbstractJoinpoint } from "../../abstract-joinpoint";
import { IAdvice } from "~/protocols";

export class StaticMethodCall extends AbstractJoinpoint {
	public getProperties(classTarget: Function): string[] {
		const properties = Object.getOwnPropertyNames(classTarget);

		return properties.filter(
			(propertyName) => typeof classTarget[propertyName] === "function"
		);
	}

	protected getSpecificJoinpointMethod(
		classTarget: Function,
		propertyName: string
	): IAdvice.PreparedJoinpointMethod {
		return classTarget[propertyName];
	}

	protected replaceJoinpointMethod(
		classTarget: Function,
		propertyName: string
	) {
		classTarget[propertyName] = this.buildJoinpointForAdvices(
			classTarget,
			propertyName
		);
	}
}
