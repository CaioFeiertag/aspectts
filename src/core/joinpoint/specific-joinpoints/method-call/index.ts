import { AbstractJoinpoint } from "../../abstract-joinpoint";
import { IAdvice } from "~/protocols";

export class MethodCall extends AbstractJoinpoint {
	public getProperties(classTarget: Function): string[] {
		const prototypedClass = classTarget.prototype;
		const properties = Object.getOwnPropertyNames(prototypedClass);

		return properties.filter(
			(propertyName) =>
				typeof prototypedClass[propertyName] === "function" &&
				propertyName !== "constructor"
		);
	}

	protected getSpecificJoinpointMethod(
		classTarget: Function,
		propertyName: string
	): IAdvice.PreparedJoinpointMethod {
		return classTarget.prototype[propertyName];
	}

	protected replaceJoinpointMethod(
		classTarget: Function,
		propertyName: string
	) {
		classTarget.prototype[propertyName] = this.buildJoinpointForAdvices(
			classTarget,
			propertyName
		);
	}
}
