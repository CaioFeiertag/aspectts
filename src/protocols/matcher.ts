import { IPointcuts } from "./pointcut";

/**
 * The matcher is responsible for matching a pointcut rule against a class, method or property name.
 *
 * If the rule is undefined or an empty array, the matcher will always return true.
 */
export interface IMatcher {
	match(name: string, rule: IPointcuts.AcceptedTypes): boolean;
}
