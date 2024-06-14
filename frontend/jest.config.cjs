module.exports = {
  // Specify the test environment as jsdom for browser-like environment in tests
  testEnvironment: 'jest-environment-jsdom',
  
  // Use babel-jest for transforming JavaScript and JSX files
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
};
