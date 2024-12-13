export default {
    preset: 'ts-jest',  // Use ts-jest to compile TypeScript
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest',  // Transform .ts files using ts-jest
    },
    moduleFileExtensions: ['ts', 'js'],  // Allow .ts and .js extensions
    transformIgnorePatterns: ['/node_modules/'],  // Ignore node_modules for transformation
    globals: {
        'ts-jest': {
            useBabelrc: true,  
        },
    },
};
