/** @type {import("prettier").Config} */
module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  arrowParens: 'avoid',
  printWidth: 100,
  proseWrap: 'always',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './apps/web/tailwind.config.ts',
  tailwindFunctions: ['clsx'],
}
