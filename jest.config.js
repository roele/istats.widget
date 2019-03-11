module.exports = {

    collectCoverage: true,

    reporters: ["default","jest-junit"],

    testPathIgnorePatterns: [
        // Default value
        "/node_modules/",
        // Exclude test resource files
        "\\.res\\.[jt]sx?$"
    ]

};
