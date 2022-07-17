import { AbstractJoinpoint } from "../../abstract-joinpoint";
import { IAdvice } from "~/protocols";

export class AcessorCall extends AbstractJoinpoint {
	constructor(private readonly type: "get" | "set") {
		super();
	}
	public getProperties(classTarget: Function): string[] {
		const prototypedClass = classTarget.prototype;
		const descriptors = Object.getOwnPropertyDescriptors(prototypedClass);
		const properties = Object.getOwnPropertyNames(prototypedClass);
		return properties.filter((propertyName) =>
			Boolean(descriptors[propertyName][this.type])
		);
	}

	private getDescriptor(classTarget: Function, propertyName: string) {
		return Object.getOwnPropertyDescriptor(
			classTarget.prototype,
			propertyName
		);
	}

	protected getSpecificJoinpointMethod(
		classTarget: Function,
		propertyName: string
	): IAdvice.PreparedJoinpointMethod {
		return this.getDescriptor(classTarget, propertyName)[this.type] as any;
	}

	protected replaceJoinpointMethod(
		classTarget: Function,
		propertyName: string
	) {
		const descriptor = this.getDescriptor(classTarget, propertyName);
		const self = this;
		descriptor[this.type] = self.buildJoinpointForAdvices(
			classTarget,
			propertyName
		) as any;
		Object.defineProperty(classTarget.prototype, propertyName, descriptor);
	}
}
