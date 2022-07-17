import { IMatcher, IPointcuts } from "~/protocols";

export class Matcher implements IMatcher {
	match(name: string, rule: IPointcuts.AcceptedTypes): boolean {
		if (!rule) return true;
		if (Array.isArray(rule)) {
			if (rule.length === 0) return true;
			return rule.includes(name);
		}
		return Boolean(name.match(rule));
	}
}
