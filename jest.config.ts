export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '.spec.ts$',
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    rootDir: '.',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
  };
  