import { AbstractJoinpoint } from "~/core/joinpoint/abstract-joinpoint";
import { IAspect, IAdvice } from "~/protocols";

const className = "valid-name";
const propertyName = "propertyName";

const makeSut = () => {
	const stubs = {
		getProperties: jest.fn(),
		getSpecificJoinpointMethod: jest.fn(),
		replaceJoinpointMethod: jest.fn(),
	};
	const joinpointMethod = jest.fn();
	stubs.getSpecificJoinpointMethod.mockImplementation(() => {
		return joinpointMethod;
	});
	class ConcreteJoinpoint extends AbstractJoinpoint {
		getProperties = stubs.getProperties;
		getSpecificJoinpointMethod = stubs.getSpecificJoinpointMethod;
		replaceJoinpointMethod = stubs.replaceJoinpointMethod;
	}

	const sut = new ConcreteJoinpoint();

	return {
		sut,
		stubs,
		target: {
			prototype: { constructor: { name: className } },
		} as Function,
		joinpointMethod,
	};
};

describe("Unit test for Abstract Joinpoint Class", () => {
	describe("test getJoinpointMethod", () => {
		it("should call getSpecificJoinpointMethod", () => {
			const { sut, stubs } = makeSut();
			const target: any = "target";
			sut.getJoinpointMethod(target, propertyName);

			expect(stubs.getSpecificJoinpointMethod).toHaveBeenCalledWith(
				target,
				propertyName
			);
		});

		it("should return the joinpointMethod if hidden property _advices_wrapping is setted", () => {
			const { sut, stubs, target } = makeSut();
			const joinpointMethod = () => {};
			joinpointMethod._advices_wrapping = () => {};
			stubs.getSpecificJoinpointMethod.mockImplementationOnce(() => {
				return joinpointMethod;
			});

			const result = sut.getJoinpointMethod(target, propertyName);

			expect(result).toBe(joinpointMethod);
			expect(stubs.getSpecificJoinpointMethod).toHaveBeenCalledOnce();
			expect(stubs.replaceJoinpointMethod).not.toHaveBeenCalled();
		});

		it("should call replaceJoinpointMethod if adviceWrapping is missing", () => {
			const { sut, stubs } = makeSut();
			const target: any = "target";
			sut.getJoinpointMethod(target, propertyName);

			expect(stubs.replaceJoinpointMethod).toHaveBeenCalledWith(
				target,
				propertyName
			);
		});
		it("should call getSpecificJoinpointMethod twice if adviceWrapping is missing", () => {
			const { sut, stubs, target } = makeSut();
			sut.getJoinpointMethod(target, propertyName);

			expect(stubs.getSpecificJoinpointMethod).toHaveBeenCalledTimes(2);
		});

		it("should return getSpecificJoinpointMethod of the second call", () => {
			const { sut, stubs, target, joinpointMethod } = makeSut();
			const myMethod: any = "myMethod";
			stubs.getSpecificJoinpointMethod
				.mockImplementationOnce(() => joinpointMethod)
				.mockImplementationOnce(() => myMethod);
			const result = sut.getJoinpointMethod(target, propertyName);

			expect(result).toBe(myMethod);
		});
	});

	describe("test getMetadata", () => {
		it("should return metadata object", () => {
			const { sut, target } = makeSut();
			const args: any = "valid-args";
			const metadata = sut["getMetadata"](target, propertyName, args);

			expect(metadata).toStrictEqual({
				className,
				methodName: propertyName,
				arguments: args,
				interrupted: false,
			});
		});
	});

	describe("test buildJoinpointForAdvices", () => {
		it("should call getSpecificJoinpointMethod", () => {
			const { sut, stubs } = makeSut();
			const target: any = "target";
			sut["buildJoinpointForAdvices"](target, propertyName);

			expect(stubs.getSpecificJoinpointMethod).toHaveBeenCalledWith(
				target,
				propertyName
			);
		});

		it("should return a new builded function with advice wrapping property", () => {
			const { sut, stubs } = makeSut();
			const target: any = "target";
			const buildedFunction = sut["buildJoinpointForAdvices"](
				target,
				propertyName
			);

			expect(typeof buildedFunction).toBe("function");
			expect(buildedFunction._advices_wrapping).toBeDefined();
		});

		it("should create a buildedFunction", () => {
			const { sut, stubs } = makeSut();
			const target: any = "target";
			const buildedFunction = sut["buildJoinpointForAdvices"](
				target,
				propertyName
			);

			expect(typeof buildedFunction).toBe("function");
			expect(buildedFunction._advices_wrapping).toBeDefined();
		});

		test("test the returned builded function", () => {
			const { sut, stubs, target, joinpointMethod } = makeSut();
			const metadata: any = { result: "result" };
			sut["getMetadata"] = jest.fn().mockImplementation(() => metadata);
			const buildedFunction = sut["buildJoinpointForAdvices"](
				target,
				propertyName
			);
			const adviceWrappingMethod = jest.fn();
			stubs.getSpecificJoinpointMethod.mockImplementationOnce(() => {
				const f = () => {};
				f._advices_wrapping = adviceWrappingMethod;
				return f;
			});
			const context = "context";
			const result = buildedFunction.bind(context)();
			expect(stubs.getSpecificJoinpointMethod).toHaveBeenCalledWith(
				target,
				propertyName
			);
			expect(adviceWrappingMethod).toHaveBeenCalledWith(
				metadata,
				context
			);
			expect(result).toBe(metadata.result);
		});

		test("test that wrapped function properly calls original joinpoint method", () => {
			const { sut, stubs, target } = makeSut();
			const metadata: any = { arguments: ["arg1"] };
			const context: any = "context";
			const originalMethod = jest
				.fn()
				.mockImplementationOnce(() => "result");
			stubs.getSpecificJoinpointMethod.mockImplementationOnce(() => {
				return {
					apply: originalMethod,
				};
			});

			const adviceWrapping = sut["buildJoinpointForAdvices"](
				target,
				propertyName
			)._advices_wrapping;
			adviceWrapping(metadata, context);

			expect(stubs.getSpecificJoinpointMethod).toHaveBeenCalledWith(
				target,
				propertyName
			);
			expect(originalMethod).toHaveBeenCalledWith(
				context,
				metadata.arguments
			);
			expect(metadata.result).toBe("result");
		});

		test("test that wrapped function returns because of interruption", () => {
			const { sut, stubs, target, joinpointMethod } = makeSut();
			const metadata: any = { arguments: ["arg1"], interrupted: true };
			const context: any = "context";

			const adviceWrapping = sut["buildJoinpointForAdvices"](
				target,
				propertyName
			)._advices_wrapping;
			adviceWrapping(metadata, context);

			expect(joinpointMethod).not.toHaveBeenCalled();
			expect(metadata.result).toBeUndefined();
		});
	});
});
