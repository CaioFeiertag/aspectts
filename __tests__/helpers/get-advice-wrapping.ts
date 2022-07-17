import { IJoinpoint, IAdvice } from "~/protocols";

const specificMap: Record<
	IJoinpoint.Name,
	(target: Function, propertyName: string) => IAdvice.PreparedJoinpointMethod
> = {
	MethodCall: (target, propertyName) => target.prototype[propertyName],
	StaticMethodCall: (target, propertyName) => target[propertyName],
	GetterCall: (target, propertyName) =>
		Object.getOwnPropertyDescriptor(target.prototype, propertyName)
			.get as any,
	SetterCall: (target, propertyName) =>
		Object.getOwnPropertyDescriptor(target.prototype, propertyName)
			.set as any,
};
export const getAdviceWrapping = (
	target: Function,
	propertyName: string,
	joinpointName: IJoinpoint.Name
) => {
	return specificMap[joinpointName](target, propertyName)._advices_wrapping;
};
