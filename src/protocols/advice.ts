import { IMetadata } from "~/protocols";
export interface IAdvice {
	weave(joinpointMethod: IAdvice.PreparedJoinpointMethod): void;
}

export declare namespace IAdvice {
	export type Name = "before" | "after" | "around" | "onThrow";
	export type WrappingFunction = (
		metadata: IMetadata,
		context: Object
	) => void;
	export type PreparedJoinpointMethod = Function & {
		_advices_wrapping: WrappingFunction;
	};
	export type Method = (metadata: IMetadata) => void;
}
