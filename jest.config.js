/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "test/server.ts",
    "test/setup.ts"
  ]
};
