import type { Config } from 'jest';

export default async (): Promise<Config> => {
	return {
		verbose: true,
		preset: 'ts-jest',
		testEnvironment: 'node',
		testMatch: ['**/*.test.ts'],
		moduleFileExtensions: ['ts', 'js'],
		moduleDirectories: ['src', 'node_modules'],
		moduleNameMapper: {
			'^@/(.*)$': '<rootDir>/src/$1',
		},
	};
};
