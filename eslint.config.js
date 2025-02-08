import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default tseslint.config(
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            "eslint.config.js",
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['server/**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ['client/**/*.{js,jsx}'],
    extends: [tseslint.configs.disableTypeChecked],
    plugins: {
      'react': react,
      'react-hooks':hooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    ignores: [
      "**/*.config.js",
    ],
  },
  {
    files: ['server/**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 6,
      parserOptions: {
        ecmaFeatures: {
        },
        ecmaVersion: 2018,
        sourceType: 'module'
      },
    },
    rules: {
      'no-multiple-empty-lines': ['error', {
        max: 1,
        maxEOF: 0,
        maxBOF: 0
      }],
      'padding-line-between-statements': ['error',
        { blankLine: 'always', prev: 'block-like', next: 'export' }
      ],
      'no-void': ['error', {
        allowAsStatement: true
      }]
    },
    ignores: [
      "dist",
      "/client/src/static/analytics/*",
    ],
  }
);
