module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["react", "@typescript-eslint"],
  settings: {
    react: { version: "detect" }
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "import/order": ["warn", { "newlines-between": "always" }]
  }
}
