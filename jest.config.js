module.exports = {
  preset: 'ts-jest', // Allows Jest to use TypeScript files
  testEnvironment: 'jsdom', // Simulates a browser-like environment for tests
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'], // Ignore these folders when running tests
  moduleDirectories: ['node_modules', 'src'], // Allows Jest to resolve modules in these folders
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Supported file extensions for modules
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS module imports
    '^@/(.*)$': '<rootDir>/src/$1', // Map @/ to <rootDir>/src/ for absolute imports
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for transforming TypeScript files
    '^.+\\.(js|jsx)$': 'babel-jest', // Optional: if you are using Babel for JavaScript
  },
  collectCoverage: true, // Optional: Enables code coverage collection
  coverageDirectory: '<rootDir>/coverage', // Directory to output coverage reports
};
