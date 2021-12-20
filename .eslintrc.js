module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
        '@vue/typescript',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4],
        'max-len': [1, { code: 200 }],
        'no-plusplus': 0,
        'padded-blocks': 0,
        'dot-notation': 0,
        'no-param-reassign': 0,
        'prefer-destructuring': 0,
        'no-await-in-loop': 0,
        'no-restricted-syntax': 0,
        'vue/no-use-v-if-with-v-for': 0,
        'vue/no-mutating-props': 0,
        'vuejs-accessibility/form-control-has-label': 0,
        'class-methods-use-this': 0,
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
};
