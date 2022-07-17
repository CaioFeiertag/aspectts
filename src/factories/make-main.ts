import { AspectTS } from "../main";
import { makeWeaver } from "./make-weaver";
import { makeRegistry } from "./make-registry";

export function makeMain() {
	const registry = makeRegistry();
	const weaver = makeWeaver(registry);

	return new AspectTS(registry, weaver);
}
