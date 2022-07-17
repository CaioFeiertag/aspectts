import { IPointcuts } from "./pointcut";
import { IMetadata } from "./metadata";

export interface IAspect {
	pointcuts: IPointcuts;
	before?(metadata: IMetadata): void;
	after?(metadata: IMetadata): void;
	around?(metadata: IMetadata): void;
	onThrow?(metadata: IMetadata): void;
}
