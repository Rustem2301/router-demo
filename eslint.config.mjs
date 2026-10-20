import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import vkphRules from './eslint-plugin-rules/index.js';

const baseNoRestrictedSyntaxRules = [
  {
    selector:
      'ExpressionStatement[expression.type=/LogicalExpression/] :matches(LogicalExpression[operator="&&"] > CallExpression, ChainExpression)',
    message: 'Амперсанд (&&) не может быть условием для вызова функции',
  },
  {
    selector: 'ImportDeclaration[source.value=/lodash$/]',
    message: 'Импортируйте только одну функцию за раз -> lodash/[functionName]',
  },
  {
    selector: 'ImportDeclaration[source.value^="date-fns/"]:not([source.value^="date-fns/locale/"])',
    message: 'Импортируйте функции date-fns из корня -> date-fns',
  },
  {
    selector: 'ImportDeclaration[source.value=date-fns/locale]',
    message: 'Импортируйте только одну локализацию за раз -> date-fns/locale/[langName]',
  },
  {
    selector: 'ImportDeclaration[source.value=/(.*)\\u002F$/]',
    message: 'Путь в операторе import не должен оканчиваться символом "/"',
  },
  {
    selector: 'ImportDeclaration[source.value=/^@vkph.*src/]',
    message: 'Импорт по техническому пути - с содержанием "src", запрещён',
  },
  {
    selector: 'ImportDeclaration[source.value=/\\u002Findex$/]',
    message: 'Импорт не должен заканчиваться на "/index"',
  },
  {
    selector:
      ':matches(JSXElement JSXExpressionContainer[expression.type=ConditionalExpression] > [consequent.type=JSXElement][consequent.closingElement!=null], [alternate.type=JSXElement][alternate.closingElement!=null])',
    message: 'В JSX запрещено использование тернарных операторов для FC с children внутри',
  },
  {
    selector: 'ExportNamedDeclaration[specifiers.length>0][source=null]',
    message: 'Укажите "export" непосредственно перед экспортируемым объектом/функцией/т.п.',
  },
];

export default defineConfig([
  {
    ignores: ['**/node_modules/*', '**/build/*', '**/coverage/*', 'eslint-plugin-rules/**'],
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
      'import/internal-regex': '^(~/|@/)',
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  { files: ['**/*.{ts,jsx,tsx}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/incompatible-library': 'warn',
      'react-hooks/unsupported-syntax': 'warn',
      'react-hooks/void-use-memo': 'warn',
      'react-hooks/error-boundaries': 'warn',
      'react-hooks/globals': 'warn',
      'react-hooks/set-state-in-render': 'warn',
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/static-components': 'warn',
      'react-hooks/use-memo': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/config': 'warn',
      'react-hooks/gating': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  importPlugin.flatConfigs.recommended,
  sonarjs.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      'import/named': 'off',
      'no-useless-escape': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-no-useless-fragment': 'off',
      'react/no-unused-prop-types': 'off',
      'react/no-unstable-nested-components': ['off'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'padding-line-between-statements': [
        2,
        {
          blankLine: 'always',
          prev: '*',
          next: ['block', 'block-like', 'cjs-export', 'class', 'const', 'let', 'var'],
        },
        {
          blankLine: 'always',
          prev: ['block', 'block-like', 'cjs-export', 'class', 'const', 'let', 'var'],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
      'max-len': [
        'warn',
        {
          code: 110,
          tabWidth: 2,
          comments: 160,
          ignoreComments: false,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'import/no-unresolved': 'off',
      'import/no-default-export': 'error',
      'import/namespace': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: true, classes: true, variables: true, typedefs: false, ignoreTypeReferences: true },
      ],
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'sonarjs/todo-tag': 'off',
      'sonarjs/redundant-type-aliases': 'off',
      'sonarjs/no-nested-functions': 'off',
      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/no-dead-store': 'off',
      'sonarjs/no-nested-conditional': 'off',
      'sonarjs/slow-regex': 'off',
      'sonarjs/anchor-precedence': 'off',
      'sonarjs/no-commented-code': 'off',
      'sonarjs/fixme-tag': 'off',
      'sonarjs/no-unused-vars': 'off',
      'sonarjs/regex-complexity': 'off',
      'sonarjs/duplicates-in-character-class': 'off',
      'sonarjs/pseudo-random': 'off',
      'sonarjs/no-clear-text-protocols': 'off',
      'no-await-in-loop': 'error',
      eqeqeq: ['error', 'smart'],
      'no-param-reassign': 'error',
      'class-methods-use-this': 'off',
      'default-param-last': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
      'jsx-a11y/mouse-events-have-key-events': 'off',
      'jsx-a11y/media-has-caption': 'off',
      'jsx-a11y/no-autofocus': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-key': [
        2,
        { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true, warnOnDuplicates: true },
      ],
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['sibling', 'parent', 'index'], 'object'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
        },
      ],
      'import/prefer-default-export': 'off',
      'linebreak-style': 'off',
      'no-bitwise': [
        'error',
        {
          allow: ['~'],
        },
      ],
      'no-restricted-syntax': ['error', ...baseNoRestrictedSyntaxRules],
    },
  },
  {
    files: ['src/pages/modules/**/*.ts'],
    rules: {
      'import/no-default-export': 0,
    },
  },
  {
    files: ['**/*.{js,cjs}'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['eslint.config.mjs'],
    rules: {
      'import/no-default-export': 0,
    },
  },
  {
    files: ['**/*.tsx'],
    ignores: ['**/*.test.tsx', '**/*.spec.tsx', '**/__tests__/**'],
    rules: {
      'max-lines': ['error', { max: 550 }],
      'sonarjs/max-lines-per-function': ['error', { maximum: 70 }],
    },
  },
  {
    files: ['**/*.{ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: { '@vkph': vkphRules },
    rules: {
      '@vkph/no-dangerous-optional-chaining': 'error',
      '@vkph/no-jsx-chaining-array-length': 'error',
      '@vkph/no-destructuring-react-props': 'error',
      '@vkph/use-effect-return-function-or-nothing': 'error',
      '@vkph/react-array-jsx-consistency': 'error',
      '@vkph/no-unnecessarily-long-imports': [
        'error',
        {
          observedPaths: [
            {
              pathContains: '@vkph/ui',
              allowedVariants: ['@vkph/ui', '@vkph/ui/styles.css', /^@vkph\/ui\/assets\/+/],
            },
            {
              pathContains: '@vkph/common',
              allowedVariants: [
                '@vkph/common/endpoints',
                '@vkph/common/hooks',
                '@vkph/common/store',
                '@vkph/common/types',
                '@vkph/common/types/models',
                '@vkph/common/utils',
              ],
            },
            {
              pathContains: '@vkph/components',
              allowedVariants: [
                '@vkph/components',
                '@vkph/components/hooks',
                '@vkph/components/types',
                '@vkph/components/utils',
                /^@vkph\/components\/[A-Z][A-Za-z0-9]*$/,
              ],
            },
          ],
        },
      ],
    },
  },
]);
