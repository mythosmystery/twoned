/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: true,
  bracketSpacing: true,
  jsxSingleQuote: false,
  semi: false,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindConfig: "./packages/config/tailwind",
};
