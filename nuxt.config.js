export default {
  publicRuntimeConfig: {
    GMAPS_KEY: process.env.GMAPS_KEY,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Fixturr',
    title: 'fixturr-ui',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vuetify-async-validate.ts',
    '~/plugins/vuetify-toasts.ts',
    '~/plugins/gmap-vue.js',
    {
      src: '~/plugins/nuxt-client-init',
      mode: 'client',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/proxy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/i18n',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: {
      components: ['VSnackbar'],
    },
    optionsPath: './vuetify.config.js',
  },

  router: {
    middleware: 'permissions',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['luxon', 'vuetify-toast-snackbar-ng'],
    hotMiddleware: {
      reload: false,
      client: {
        // turn off client overlay when errors are present
        overlay: false,
      },
    },
  },

  svg: {
    vueSvgLoader: {
      // vue-svg-loader options
    },
    svgSpriteLoader: {
    },
    fileLoader: {
      // file-loader options
    },
  },

  proxy: {
    '/api/v1': {
      target: process.env.API_URL || 'http://127.0.0.1:3333',
    },
    '/upload': {
      target: process.env.API_URL || 'http://127.0.0.1:3333',
    },
  },

  i18n: {
    strategy: 'no_prefix',
    locales: [
      { code: 'en', file: 'en.js' },
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    langDir: 'lang/',
  },
}
