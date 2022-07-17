import { IJoinpoint } from "~/protocols";

const makeJointpointSub = (): IJoinpoint => {
	return {
		getProperties: jest.fn(),
		getJoinpointMethod: jest.fn(),
	};
};

export function makeJoinpointsStub(): Record<IJoinpoint.Name, IJoinpoint> {
	return {
		MethodCall: makeJointpointSub(),
		StaticMethodCall: makeJointpointSub(),
		GetterCall: makeJointpointSub(),
		SetterCall: makeJointpointSub(),
	};
}
