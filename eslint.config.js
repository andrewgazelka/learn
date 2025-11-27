import prettier from 'eslint-config-prettier';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	// Use strict type-checked config for maximum strictness
	...ts.configs.strictTypeChecked,
	// Add stylistic rules for consistent code style
	...ts.configs.stylisticTypeChecked,
	// Use all svelte rules (includes recommended + more)
	...svelte.configs.all,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				projectService: true,
				tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url))
			}
		},
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',

			// === Strict TypeScript Rules ===
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unsafe-assignment': 'error',
			'@typescript-eslint/no-unsafe-call': 'error',
			'@typescript-eslint/no-unsafe-member-access': 'error',
			'@typescript-eslint/no-unsafe-return': 'error',
			'@typescript-eslint/no-unsafe-argument': 'error',
			'@typescript-eslint/restrict-template-expressions': 'error',
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/await-thenable': 'error',
			'@typescript-eslint/no-misused-promises': 'error',
			'@typescript-eslint/require-await': 'error',
			'@typescript-eslint/strict-boolean-expressions': [
				'error',
				{
					allowString: false,
					allowNumber: false,
					allowNullableObject: false,
					allowNullableBoolean: false,
					allowNullableString: false,
					allowNullableNumber: false,
					allowAny: false
				}
			],
			'@typescript-eslint/no-unnecessary-condition': 'error',
			'@typescript-eslint/no-unnecessary-type-assertion': 'error',
			'@typescript-eslint/prefer-nullish-coalescing': 'error',
			'@typescript-eslint/prefer-optional-chain': 'error',
			'@typescript-eslint/switch-exhaustiveness-check': 'error',
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
			'@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/explicit-function-return-type': [
				'error',
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
					allowHigherOrderFunctions: true,
					allowDirectConstAssertionInArrowFunctions: true
				}
			],
			'@typescript-eslint/explicit-module-boundary-types': 'error',
			'@typescript-eslint/no-non-null-assertion': 'error',
			'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
			'@typescript-eslint/prefer-readonly': 'error',
			'@typescript-eslint/prefer-as-const': 'error',
			'@typescript-eslint/no-inferrable-types': 'off', // Allow explicit types for clarity
			'@typescript-eslint/typedef': [
				'error',
				{
					arrayDestructuring: false,
					arrowParameter: false,
					memberVariableDeclaration: true,
					objectDestructuring: false,
					parameter: true,
					propertyDeclaration: true,
					variableDeclaration: false,
					variableDeclarationIgnoreFunction: true
				}
			],

			// === Core ESLint Strict Rules ===
			eqeqeq: ['error', 'always'],
			'no-eval': 'error',
			'no-implied-eval': 'error',
			'no-new-func': 'error',
			'no-return-assign': 'error',
			'no-sequences': 'error',
			'no-throw-literal': 'error',
			'no-unused-expressions': 'error',
			'no-useless-concat': 'error',
			'no-useless-return': 'error',
			'prefer-promise-reject-errors': 'error',
			radix: 'error',
			'require-unicode-regexp': 'error',
			'no-var': 'error',
			'prefer-const': 'error',
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'no-duplicate-imports': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-rename': 'error',
			'object-shorthand': 'error',
			'prefer-arrow-callback': 'error',
			'prefer-template': 'error',
			'symbol-description': 'error',

			// === Svelte Strict Rules (beyond recommended) ===
			'svelte/no-at-html-tags': 'error',
			'svelte/no-target-blank': 'error',
			'svelte/button-has-type': 'error',
			'svelte/no-reactive-reassign': 'error',
			'svelte/require-each-key': 'error',
			'svelte/valid-each-key': 'error',
			'svelte/no-useless-mustaches': 'error',
			'svelte/no-dupe-else-if-blocks': 'error',
			'svelte/no-dupe-style-properties': 'error',
			'svelte/no-shorthand-style-property-overrides': 'error',
			'svelte/require-store-reactive-access': 'error',
			'svelte/no-store-async': 'error',
			'svelte/no-object-in-text-mustaches': 'error',
			'svelte/no-dom-manipulating': 'error',
			'svelte/no-inspect': 'error',
			'svelte/prefer-class-directive': 'error',
			'svelte/prefer-style-directive': 'error',
			'svelte/shorthand-attribute': 'error',
			'svelte/shorthand-directive': 'error',
			'svelte/sort-attributes': 'error',
			'svelte/spaced-html-comment': 'error',

			// Disable some svelte/all rules that conflict with Svelte 5 or are too noisy
			'svelte/no-unused-class-component-options': 'off', // Svelte 5 doesn't use class components
			'svelte/experimental-require-slot-types': 'off', // Experimental
			'svelte/experimental-require-strict-events': 'off', // Experimental
			'svelte/no-unused-class-name': 'off', // False positives with Tailwind CSS
			'svelte/block-lang': 'off', // TypeScript is inferred from tsconfig
			'svelte/no-inline-styles': 'off', // Sometimes inline styles are needed
			'svelte/no-restricted-html-elements': 'off', // Project-specific
			'svelte/require-optimized-style-attribute': 'off' // Not always needed
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		},
		rules: {
			// Svelte components often have implicit returns and side effects
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			// $state, $derived etc. are reactive - these rules can be too strict
			'@typescript-eslint/no-unnecessary-condition': 'off'
		}
	},
	{
		// Config files - disable type-checked rules since they're not in tsconfig
		files: ['*.config.js', '*.config.ts', '*.config.mjs', 'vite.config.*', 'svelte.config.*'],
		extends: [ts.configs.disableTypeChecked],
		rules: {
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off'
		}
	}
);
