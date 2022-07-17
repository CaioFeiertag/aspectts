const config = {
	preset: "ts-jest",
	collectCoverageFrom: [
		"<rootDir>/src/**/*.ts",
		"!<rootDir>/src/protocols/**/*.ts",
	],
	coverageDirectory: "coverage",
	coverageReporters: ["json-summary", "json", "lcov", "text", "clover"],
	coverageProvider: "babel",
	testEnvironment: "node",
	transform: {
		".+\\.ts$": "ts-jest",
	},
	testMatch: ["**/*.(spec|test).ts"],
	clearMocks: true,
	moduleNameMapper: {
		"~/(.*)": "<rootDir>/src/$1",
	},
	setupFilesAfterEnv: ["jest-extended/all"],
};
export default config;
