module.exports = {
  extends: ["eslint-config-next", "prettier"],
  ignorePatterns: ["*.d.ts"],
  settings: {
    next: {
      rootDir: ["./apps/*/", "./packages/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/no-unknown-property": [
      2,
      {
        "ignore": [
          "jsx"
        ]
      }
    ]
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      plugins: ["@typescript-eslint"],
      parserOptions: {
        project: "./tsconfig.json",
      },
      rules: {
        "@typescript-eslint/no-floating-promises": "error",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["off"],
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": ["error"],
        "react/display-name": "off",
      },
    },
  ],
}
