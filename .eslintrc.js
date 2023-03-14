const path = require("path");

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        'plugin:react/recommended'
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react',
        'react-hooks',
        "import"
    ],
    rules: {
        'react/react-in-jsx-scope': 0,
        'arrow-body-style': [2, 'as-needed'],
        'prefer-template': 2,
        'react/prop-types': 0,
        'react-hooks/exhaustive-deps': 'error',
        'semi-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        semi: [2, 'always'],
        "object-property-newline": 1,
        'object-curly-newline': [
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
        "indent": [
            2,
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: 1
            }
        ],
        "no-undef-init": 2,
        "no-undef": "error",
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
        "import/dynamic-import-chunkname": [
            2,
            {
                importFunctions: ["dynamicImport"],
                webpackChunknameFormat: "[a-zA-Z0-9-./_]+"
            }
        ],
        "react/self-closing-comp": 2,
        "react/display-name": 0,
        "no-console": 2,
        "no-restricted-imports": [
            "error",
            {
                "patterns": ["@mui/*/*/*"]
            }
        ]
    },
    settings: {
        react: {
            version: 'detect'
        },
        "import/resolver": {
            webpack: {
                config: path.resolve(__dirname, "./build/configs/webpack.common.js")
            }
        }
    }
};
