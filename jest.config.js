module.exports = {

    collectCoverage: false,

    coverageDirectory: './reports/coverage',

    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

    reporters: ['default','jest-junit'],

    roots: ['<rootDir>/src'],

    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect',
        '@testing-library/react/cleanup-after-each'
    ],

    testMatch: ['<rootDir>/src/**/?(*.)test.{js, jsx}'],

    testPathIgnorePatterns: [
        // Default value
        '/node_modules/',
        // Exclude test resource files
        '\\.res\\.[jt]sx?$'
    ],

    transform: {
        '\\.(js|jsx)?$': 'babel-jest',
    }
};
