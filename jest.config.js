/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts']
};
