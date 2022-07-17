import { IAspect } from "~/protocols";
export function createAspect(withBeforeAdvice = false) {
	const aspect: IAspect = {
		pointcuts: {
			joinpointType: "MethodCall",
			className: [],
			methodOrProperty: [],
		},
	};
	if (withBeforeAdvice) aspect.before = () => {};
	return aspect;
}
