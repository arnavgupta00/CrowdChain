/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    // Disable specific rules here
    "@typescript-eslint/no-unsafe-assignment": "off", // Example: Disabling unsafe assignment
    "react/react-in-jsx-scope": "off",               // Example: Disable React-in-scope for Next.js
  },
};
