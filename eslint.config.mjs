import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  ...tseslint.configs.recommended,
  {
    rules: {
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "arrow-parens": ["error", "always"],
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];
