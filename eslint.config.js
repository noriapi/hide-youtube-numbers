import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import ts from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import solid from "eslint-plugin-solid/configs/typescript.js";
import prettier from "eslint-config-prettier";

/** @type { import("eslint").Linter.FlatConfig } */
const tsConfig = {
  files: ["**/*.{ts,tsx}"],
  plugins: {
    "@typescript-eslint": ts,
  },
  languageOptions: {
    parser: tsParser,
  },
  rules: {
    ...ts.configs.recommended.rules,
  },
};

/** @type { import("eslint").Linter.FlatConfig } */
const solidConfig = {
  files: ["src/**/*.{ts,tsx}"],
  ...solid,
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: "tsconfig.json",
    },
  },
};

/** @type { import("eslint").Linter.FlatConfig } */
const srcConfig = {
  files: ["src/**/*.{ts,tsx}"],
  languageOptions: {
    parserOptions: {
      sourceType: "module",
    },
    globals: { ...globals.browser, ...globals.es2021 },
  },
  rules: {
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "off",
  },
};

/** @type { import("eslint").Linter.FlatConfig } */
const configConfig = {
  files: ["*.config.*"],
  languageOptions: {
    globals: { ...globals.node },
  },
};

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
  },
  {
    ignores: [".output/*", ".wxt/*"],
  },
  js.configs.recommended,
  tsConfig,
  solidConfig,
  srcConfig,
  configConfig,
  prettier,
];
