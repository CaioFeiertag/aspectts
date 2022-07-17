import * as exportedContent from "~/index";
import { AspectTS } from "~/main";
import { makeAdvised } from "~/factories/make-advised";

describe("Integration test for verify content exported from package", () => {
	it("should export main module as default", () => {
		expect(exportedContent.default).toBeInstanceOf(AspectTS);
	});

	it("should export advised decorator module as default", () => {
		expect(typeof exportedContent.Advised).toBe("function");
		expect(exportedContent.Advised.toString()).toBe(
			makeAdvised(exportedContent.default).toString()
		);
	});
});
