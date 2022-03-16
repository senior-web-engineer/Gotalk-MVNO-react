module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-unused-vars': [1],
    'react/prop-types': [0],
    'react/require-default-props': [0],
    'react/jsx-props-no-spreading': [0],
    'implicit-arrow-linebreak': [1],
    'default-param-last': [0],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-static-element-interactions': [1],
    'react/function-component-definition': [0],
    'linebreak-style': ['error', 'unix'],
    'react/forbid-prop-types': ['error',
      {
        forbid: ['any'],
        checkContextTypes: false,
        checkChildContextTypes: false,
      }],
    'import/order': ['warn', {
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      groups: ['index', 'sibling', 'parent', 'internal', 'external', 'builtin', 'object', 'type'],
    }],
    'jsx-a11y/label-has-associated-control': [2, {
      labelComponents: ['CustomInputLabel'],
      labelAttributes: ['label'],
      controlComponents: ['CustomInput'],
      depth: 3,
    }],
  },
};
