const path = require("path");

module.exports = {
    env: {
        "browser": true,
        "es6": true,
        "node": true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        path.resolve(__dirname, "./build/eslint/eslint-config-typescript.js")
    ],
    overrides: [
    ],
    parserOptions: {
        sourceType: "module",
        allowImportExportEverywhere: false,
        ecmaFeatures: {
            globalReturn: false
        },
        requireConfigFile: false,
        babelOptions: {
            presets: ["@babel/env", "@babel/react"]
        },
        tsconfigRootDir: `${__dirname}`,
        ecmaVersion: 2022,
        project: "tsconfig.json"
    },
    plugins: [
        "react",
        "react-hooks",
        "import"
    ],
    rules: {
        "no-undef": "off",
        "quotes": [2, "double"],
        "react/react-in-jsx-scope": 0,
        "arrow-body-style": [2, "as-needed"],
        "prefer-template": 2,
        "react/prop-types": 0,
        "react-hooks/exhaustive-deps": "error",
        "react-hooks/rules-of-hooks": "error",
        "semi-spacing": [
            2,
            {
                before: false,
                after: true
            }
        ],
        semi: [2, "always"],
        "object-property-newline": 1,
        "object-curly-newline": [
            2,
            {
                consistent: true,
                multiline: true
            }
        ],
        "key-spacing": [
            2,
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        "comma-dangle": [2, "never"],
        "no-trailing-spaces": 2,
        "no-undef-init": 2,
        "object-shorthand": [2, "always"],
        "react/jsx-no-undef": [
            2, {
                allowGlobals: true
            }
        ],
        "comma-spacing": [
            2,
            {
                after: true,
                before: false
            }
        ],
        "react/jsx-key": 2,
        "react/jsx-no-bind": 2,
        "react/jsx-no-duplicate-props": [
            2, {
                ignoreCase: true
            }
        ],
        "space-infix-ops": 2,
        "keyword-spacing": [
            2,
            {
                before: true,
                after: true
            }
        ],
        "arrow-spacing": [
            2,
            {
                before: true,
                after: true
            }
        ],
        "no-multi-spaces": 2,
        "react/jsx-equals-spacing": [
            2,
            "never"
        ],
        "react/self-closing-comp": 2,
        "react/display-name": 0,
        "no-console": 2,
        "no-restricted-imports": [
            "error",
            {
                "patterns": ["@mui/*/*/*"]
            }
        ],
        "prefer-destructuring": [
            1,
            {
                VariableDeclarator: {
                    array: false,
                    object: true
                },
                AssignmentExpression: {
                    array: true,
                    object: true
                }
            },
            {
                enforceForRenamedProperties: false
            }
        ],
        "no-duplicate-imports": [2, { includeExports: true }],
        "indent": [
            2,
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: 1,
                ArrayExpression: "first",
                outerIIFEBody: 1,
                FunctionDeclaration: {
                    parameters: 1,
                    body: 1
                },
                FunctionExpression: {
                    parameters: 1,
                    body: 1
                },
                CallExpression: {
                    arguments: 1
                },
                ObjectExpression: 1,
                ImportDeclaration: 1,
                flatTernaryExpressions: false,
                ignoredNodes: [
                    "JSXElement",
                    "JSXElement > *",
                    "JSXAttribute",
                    "JSXIdentifier",
                    "JSXNamespacedName",
                    "JSXMemberExpression",
                    "JSXSpreadAttribute",
                    "JSXExpressionContainer",
                    "JSXOpeningElement",
                    "JSXClosingElement",
                    "JSXText",
                    "JSXEmptyExpression",
                    "JSXSpreadChild"
                ],
                ignoreComments: false
            }
        ],
        "operator-linebreak": [2, "after"],
        "react/jsx-indent-props": [
            2,
            4
        ],
        "react/jsx-indent": [
            2,
            4
        ],
        "max-len": [
            2,
            {
                code: 120,
                tabWidth: 4,
                ignoreRegExpLiterals: true,
                ignoreUrls: true,
                ignoreComments: false,
                ignoreStrings: false,
                ignoreTemplateLiterals: true
            }
        ],
        "react/jsx-closing-bracket-location": [2, "tag-aligned"]
    },
    settings: {
        react: {
            version: "detect"
        },
        "import/resolver": {
            webpack: {
                config: path.resolve(__dirname, "./build/configs/webpack.common.js")
            }
        }
    }
};
