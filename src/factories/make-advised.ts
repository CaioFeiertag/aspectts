import { IAspectTS } from "../protocols";
import { buildAdvisedDecorator } from "../helpers/advised-decorator";

export function makeAdvised(aspectTS: IAspectTS) {
	return buildAdvisedDecorator(aspectTS);
}
