/* eslint-env node */
module.exports = {
    overrides: [
        {
            files: ["**/*.ts", "**/*.tsx"],
            env: {
                browser: true,
                es6: true,
                node: true
            },
            extends: [
                "plugin:@typescript-eslint/eslint-recommended"
            ],
            globals: {
                Atomics: "readonly",
                SharedArrayBuffer: "readonly"
            },
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaFeatures: { jsx: true },
                ecmaVersion: 2022,
                sourceType: "module"
            },
            plugins: ["@typescript-eslint"],
            rules: {
                "no-undef": "off",
                "@typescript-eslint/array-type": [2, {
                    default: 'array-simple'
                }],

                "space-infix-ops": "off",
                "@typescript-eslint/space-infix-ops": ["error", { int32Hint: false }],

                "space-before-function-paren": "off",
                "@typescript-eslint/space-before-function-paren": ["error", "always"],

                semi: "off",
                "@typescript-eslint/semi": ["error", "always"],

                "no-return-await": "off",
                "@typescript-eslint/return-await": "error",

                quotes: "off",
                "@typescript-eslint/quotes": ["error", "double", { allowTemplateLiterals: true }],

                "padding-line-between-statements": "off",
                "@typescript-eslint/padding-line-between-statements": ["error", {
                    blankLine: "always",
                    prev: "*",
                    next: ["class", "export", "function"]
                },
                                                                       {
                                                                           blankLine: "always",
                                                                           prev: ["class", "directive"],
                                                                           next: "*"
                                                                       }],

                "no-useless-constructor": "off",
                "@typescript-eslint/no-useless-constructor": ["error"],

                "no-use-before-define": "off",
                "@typescript-eslint/no-use-before-define": ["error"],

                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": ["error"],

                "no-unused-expressions": "off",
                "@typescript-eslint/no-unused-expressions": ["error", {
                    enforceForJSX: true,
                    allowTaggedTemplates: true
                }],

                "no-throw-literal": "off",
                "@typescript-eslint/no-throw-literal": ["error"],

                "no-shadow": "off",
                "@typescript-eslint/no-shadow": ["error", {
                    builtinGlobals: false,
                    ignoreFunctionTypeParameterNameValueShadow: true,
                    ignoreTypeValueShadow: true
                }],

                "no-redeclare": "off",
                "@typescript-eslint/no-redeclare": ["error"],

                "no-magic-numbers": "off",
                "@typescript-eslint/no-magic-numbers": ["off"],

                "no-loop-func": "off",
                "@typescript-eslint/no-loop-func": ["error"],

                "no-invalid-this": "off",
                "@typescript-eslint/no-invalid-this": ["error"],

                "no-extra-parens": "off",
                "@typescript-eslint/no-extra-parens": ["error"],

                "no-duplicate-imports": "off",
                "@typescript-eslint/no-duplicate-imports": ["error", { includeExports: true }],

                "no-dupe-class-members": "off",
                "@typescript-eslint/no-dupe-class-members": ["error"],

                "lines-between-class-members": "off",
                "@typescript-eslint/lines-between-class-members": ["error"],

                "keyword-spacing": "off",
                "@typescript-eslint/keyword-spacing": ["error"],

                "init-declarations": "off",
                "@typescript-eslint/init-declarations": ["error"],

                indent: "off",
                "@typescript-eslint/indent": ["error"],

                "func-call-spacing": "off",
                "@typescript-eslint/func-call-spacing": ["error"],

                "dot-notation": "off",
                "@typescript-eslint/dot-notation": ["error"],

                "default-param-last": "off",
                "@typescript-eslint/default-param-last": ["error"],

                "comma-spacing": "off",
                "@typescript-eslint/comma-spacing": ["error"],

                "comma-dangle": "off",
                "@typescript-eslint/comma-dangle": ["error"],

                "brace-style": "off",
                "@typescript-eslint/brace-style": ["error", "1tbs", { allowSingleLine: false }],

                "@typescript-eslint/unified-signatures": "error",

                "@typescript-eslint/type-annotation-spacing": "error",
                "@typescript-eslint/prefer-ts-expect-error": "error",
                "@typescript-eslint/prefer-string-starts-ends-with": "error",
                "@typescript-eslint/prefer-optional-chain": "error",
                "@typescript-eslint/prefer-nullish-coalescing": "error",
                "@typescript-eslint/prefer-includes": "error",
                "@typescript-eslint/prefer-enum-initializers": "error",
                "@typescript-eslint/no-unnecessary-qualifier": "error",
                "@typescript-eslint/no-unnecessary-condition": "error",
                "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
                "@typescript-eslint/no-require-imports": "error",
                "@typescript-eslint/no-base-to-string": "error",
                "@typescript-eslint/member-delimiter-style": "error",
                "@typescript-eslint/explicit-module-boundary-types": "error",
                "react/react-in-jsx-scope": 0
            }
        }
    ]
};