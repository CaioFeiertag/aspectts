import { IAdvice } from "./advice";
export interface IJoinpoint {
	getProperties(classTarget: Object): string[];
	getJoinpointMethod(
		classTarget: Object,
		methodName: string
	): IAdvice.PreparedJoinpointMethod;
}

export declare namespace IJoinpoint {
	export type Name =
		| "MethodCall"
		| "StaticMethodCall"
		| "GetterCall"
		| "SetterCall";
}

export type JoinpointType = IJoinpoint.Name;
