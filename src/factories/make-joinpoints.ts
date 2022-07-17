import { MethodCall, StaticMethodCall, AcessorCall } from "../core/joinpoint";
import { IJoinpoint } from "~/protocols";

export function makeJoinpoints(): Record<IJoinpoint.Name, IJoinpoint> {
	return {
		MethodCall: new MethodCall(),
		StaticMethodCall: new StaticMethodCall(),
		GetterCall: new AcessorCall("get"),
		SetterCall: new AcessorCall("set"),
	};
}
