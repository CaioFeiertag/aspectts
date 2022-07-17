import { AbstractAdvice } from "~/core/advice//abstract-advice";
import { IAspect, IAdvice } from "~/protocols";

const makeSut = () => {
	const specificHandler = jest.fn();
	class ConcreteAdvice extends AbstractAdvice {
		callSpecificAdvice = specificHandler;
	}
	const joinpointMethod: IAdvice.PreparedJoinpointMethod = () => {};
	const currentMethod: any = "currentMethod";
	joinpointMethod._advices_wrapping = currentMethod;
	const sut = new ConcreteAdvice(jest.fn());

	return {
		sut,
		joinpointMethod,
		currentMethod,
		specificHandler,
		metadata: { interrupted: false } as any,
	};
};

const context: any = "context";

describe("Unit test for Abstract Advice Class", () => {
	describe("test weave function", () => {
		it("should call private function to build new wrapping method", () => {
			const { sut, joinpointMethod, currentMethod } = makeSut();
			const mockBuildMethod = jest.fn();
			sut["buildNewWrappingMethod"] = mockBuildMethod;
			sut.weave(joinpointMethod);

			expect(mockBuildMethod).toHaveBeenCalledWith(currentMethod);
		});
		it("should replace wrapping method with returned from function to build new method", () => {
			const { sut, joinpointMethod } = makeSut();
			const mockBuildMethod = jest
				.fn()
				.mockReturnValue("newWrappingMethod");
			sut["buildNewWrappingMethod"] = mockBuildMethod;
			sut.weave(joinpointMethod);

			expect(joinpointMethod._advices_wrapping).toBe("newWrappingMethod");
		});
	});

	describe("test function builded from private function buildNewWrappingMethod", () => {
		it("should call specific advice handler", () => {
			const { sut, specificHandler, currentMethod, metadata } = makeSut();

			const newWrappingMethod =
				sut["buildNewWrappingMethod"](currentMethod);

			newWrappingMethod(metadata, context);

			expect(specificHandler).toHaveBeenCalledWith(
				metadata,
				expect.any(Function)
			);
		});
		it("should return before calling specific advice handler", () => {
			const { sut, specificHandler, currentMethod, metadata } = makeSut();

			const newWrappingMethod =
				sut["buildNewWrappingMethod"](currentMethod);

			metadata.interrupted = true;

			newWrappingMethod(metadata, context);

			expect(specificHandler).not.toHaveBeenCalled();
		});

		it("should reset the proceed method from metadata", () => {
			const { sut, currentMethod, metadata } = makeSut();

			const newWrappingMethod =
				sut["buildNewWrappingMethod"](currentMethod);
			metadata.proceed = currentMethod;
			newWrappingMethod(metadata, context);
			expect(metadata.proceed).toBeUndefined();
		});

		it("should pass a proceed function to specific handler that calls currentMethod", () => {
			const { sut, specificHandler, metadata } = makeSut();
			const currentMethod = jest.fn();

			const newWrappingMethod =
				sut["buildNewWrappingMethod"](currentMethod);
			newWrappingMethod(metadata, context);
			specificHandler.mock.calls[0][1]();
			expect(currentMethod).toHaveBeenCalledWith(metadata, context);
		});
	});
});
