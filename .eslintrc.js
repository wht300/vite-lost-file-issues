module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    // parser: '@babel/eslint-parser',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue', 'prettier'],
  rules: {
    // 'no-console': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    'no-irregular-whitespace': 'warn',
    'no-redeclare': 'warn',
    'no-useless-escape': 'warn',
    'no-undef': 'warn',
    'no-empty': 'warn',
    'no-dupe-keys': 'warn',
    'no-unreachable': 'warn',
    // 变量赋值给自己 test.name = test.name
    'no-self-assign': 'warn',
    // test.hasOwnProperty('name')
    'no-prototype-builtins': 'warn',
    'use-isnan': 'warn',
    'vue/no-mutating-props': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/no-parsing-error': 'warn',
    'vue/require-v-for-key': 'warn',
    'vue/no-use-v-if-with-v-for': 'warn',
    'vue/no-unused-components': 'warn',
    'vue/no-shared-component-data': 'warn',
    'vue/return-in-computed-property': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/no-dupe-keys': 'warn',
  },
};
