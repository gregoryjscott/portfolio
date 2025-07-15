module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "prettier"],
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:markdown/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "none",
        varsIgnorePattern: "^_",
      },
    ],
    "prefer-const": [
      "error",
      {
        ignoreReadBeforeAssign: true,
        destructuring: "all",
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/no-extraneous-dependencies": "error",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/jsx-key": "off",
  },
}
