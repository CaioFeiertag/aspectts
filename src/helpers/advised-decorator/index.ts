import { IAspectTS } from "../../protocols";

export function buildAdvisedDecorator(aspectTS: IAspectTS) {
	function Advised(): ClassDecorator {
		return function (target: Function) {
			return aspectTS.registerTargets([target]);
		};
	}

	return Advised;
}
