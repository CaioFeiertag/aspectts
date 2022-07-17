import { IRegistry } from "../protocols";
import { Weaver } from "../core/weaver";
import { makeJoinpoints } from "./make-joinpoints";
import { makeAdviceBuilders } from "./make-advice-builders";
import { makeMatcher } from "./make-matcher";

export function makeWeaver(registry: IRegistry) {
	const joinpoints = makeJoinpoints();
	const adviceBuilders = makeAdviceBuilders();
	const matcher = makeMatcher();

	return new Weaver(registry, joinpoints, adviceBuilders, matcher);
}
