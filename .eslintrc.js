module.exports = {
	env: {
		node: true, // Node.js 환경임을 명시합니다.
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'prettier/prettier': 'error',
	},
};
