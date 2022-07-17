export interface IMetadata<A = any[], R = any> {
	className: string;
	methodName: string;
	arguments: A;
	result?: R;
	proceed?: () => R;
	interrupted: boolean;
	error?: Error;
}
