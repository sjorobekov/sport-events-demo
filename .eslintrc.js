module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],
  },
}
