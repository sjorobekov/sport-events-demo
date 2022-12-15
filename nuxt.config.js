export default {
  publicRuntimeConfig: {
    GMAPS_KEY: process.env.GMAPS_KEY,
    PORTAL_WILDCARD: process.env.PORTAL_WILDCARD,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Fixturr',
    title: 'Welcome',
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
    '~/plugins/wrapped-component.js',
    '~/plugins/device.server.ts',
    '~/plugins/vue-balance-text.js',
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
    icon: {
      source: '~/static/icon.png',
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
    middleware: ['checkPortalPrivacy', 'permissions'],
    extendRoutes (routes) {
      routes.push({ name: 'directory-sports-map', path: '/directory/sports-map', component: '@/pages/management/schools/_id/locations/index.vue' })
      routes.push({ name: 'directory-sports-map-locationId', path: '/directory/sports-map/:locationId', component: '@/pages/management/schools/_id/locations/_locationId.vue' })
      routes.push({
        name: 'announcements-add',
        path: '/announcements/add',
        component: '@/pages/announcements/add.vue',
      })
      routes.push({
        name: 'announcements',
        path: '/announcements',
        component: '@/pages/announcements/index.vue',
        children: [
          {
            name: 'announcements-id',
            path: ':id',
            component: '@/pages/announcements/_id/index',
          },
          {
            name: 'announcements-id-edit',
            path: ':id/edit',
            component: '@/pages/announcements/_id/edit',
          },
        ],
      })
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['luxon', 'vuetify-toast-snackbar-ng', 'vue-wrapped-component'],
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
