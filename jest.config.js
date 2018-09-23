module.exports = {
  // bail: true,
  // verbose: true,
  // collectCoverage: true,
  // coverageReporters: ["json", "html"],
  unmockedModulePathPatterns: ["node_modules/react/", "node_modules/enzyme/"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  collectCoverageFrom: [
    "src/**/*.js",
    "src/index.js",
    "!__mocks__/**",
    "!**/fixtures/**/*.js",
    "!**/**/test-setup.js",
    "!**/**/*.spec.js",
    "!**/**/*.mock.js",
    "!**/**/*.test.js"
  ],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 45,
      functions: 55,
      lines: 60
    }
  }
};
