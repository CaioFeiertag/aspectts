import { JoinpointType } from "./joinpoint";
export interface IPointcuts {
	className?: IPointcuts.AcceptedTypes;
	methodOrProperty?: IPointcuts.AcceptedTypes;
	joinpointType?: JoinpointType;
}

export declare namespace IPointcuts {
	export type AcceptedTypes = RegExp | string[] | undefined;
}
