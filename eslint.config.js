import tseslint from 'typescript-eslint';

export default tseslint.config(
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
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
      "/client/src/static/analytics/*"
    ],
  }
);
