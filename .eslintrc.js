const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';
/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	ignorePatterns: ['node_modules'],
	root: true,
	env: {
		node: true,
		es2021: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: './tsconfig.json',
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
	},
	plugins: [
		'@typescript-eslint',
		'check-file',
		// ,@tanstack/react-query для rtk
		'prettier',
	],
	extends: [
		'next/core-web-vitals',
		'next/typescript',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier',
	],

	rules: {
		'prettier/prettier': WARN,
		'no-console': [WARN, {allow: ['warn', 'error']}],
		'class-methods-use-this': OFF,
		'no-debugger': WARN,
		'arrow-body-style': OFF,
		'no-plusplus': OFF,
		'no-underscore-dangle': OFF,
		'no-nested-ternary': OFF,
		// TYPESCRIPT
		'@typescript-eslint/no-unused-vars': [
			WARN,
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/no-misused-promises': [
			ERROR,
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],

		'react/function-component-definition': [
			ERROR,
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'react/jsx-props-no-spreading': OFF,
		'react/require-default-props': OFF,

		// FILE NAMINGS
		'check-file/folder-naming-convention': [
			ERROR,
			{
				'**/*': 'KEBAB_CASE',
			},
		],
		'check-file/filename-naming-convention': [
			ERROR,
			{
				'**/*/!(_app|_document).{js,ts,jsx,tsx}': 'KEBAB_CASE',
				'**/*/': 'KEBAB_CASE',
			},
			{
				ignoreMiddleExtensions: true, // всякие .min. .test. .d. в file.min/d/test.ts будут игнориться и названия таких файлов тоже будут проверяться
			},
		],
		'import/no-extraneous-dependencies': [
			// запрещает (при false) импорт разных видов пакетов
			ERROR,
			{devDependencies: false, optionalDependencies: false, peerDependencies: false},
		],
	},
};
