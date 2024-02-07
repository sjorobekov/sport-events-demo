export default {
  publicRuntimeConfig: {
    GMAPS_KEY: process.env.GMAPS_KEY,
    PORTAL_WILDCARD: process.env.PORTAL_WILDCARD,
    PADDLE_SANDBOX: process.env.PADDLE_SANDBOX,
    PADDLE_VENDOR_ID: process.env.PADDLE_VENDOR_ID,
    MATOMO_HOST: process.env.MATOMO_HOST,
    MATOMO_SITE_ID: process.env.MATOMO_SITE_ID,
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
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '128x128', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css' },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        href: '/apple-splash-1136-640.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        href: '/apple-splash-640-1136.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        href: '/apple-splash-1334-750.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: 'device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        href: '/apple-splash-750-1334.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        href: '/apple-splash-2208-1242.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        href: '/apple-splash-1242-2208.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        href: '/apple-splash-1792-828.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        href: '/apple-splash-828-1792.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        href: '/apple-splash-2688-1242.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        href: '/apple-splash-1242-2688.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        href: 'pple-splash-2436-1125.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        href: '/apple-splash-1125-2436.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        href: '/apple-splash-2532-1170.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        href: '/apple-splash-1170-2532.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        href: '/apple-splash-2778-1284.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        href: '/apple-splash-1284-2778.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        href: '/apple-splash-2556-1179.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        href: '/apple-splash-1179-2556.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        href: '/apple-splash-2796-1290.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        href: '/apple-splash-1290-2796.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        href: '/apple-splash-2160-1620.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        href: '/apple-splash-2224-1668.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        href: '/apple-splash-1668-2224.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        href: '/apple-splash-2048-1536.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        href: '/apple-splash-1536-2048.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        href: '/apple-splash-1668-2388.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        href: '/apple-splash-2388-1668.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        href: '/apple-splash-2732-2048.jpg',
      },
      {
        rel: 'apple-touch-startup-image',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        href: '/apple-splash-2048-2732.jpg',
      },
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
    {
      src: '~/plugins/gmap-vue.js',
      mode: 'client',
    },
    {
      src: '~/plugins/nuxt-client-init',
      mode: 'client',
    },
    {
      src: '~/plugins/datetimepicker',
      mode: 'client',
    },
    '~/plugins/wrapped-component.js',
    '~/plugins/device.server.ts',
    '~/plugins/vue-balance-text.js',
    {
      src: '~/plugins/vue-matomo.js',
      ssr: false,
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
      name: 'Fixturr',
      short_name: 'Fixturr',
      lang: 'en',
      useWebmanifestExtension: false,
      background_color: '#4368FA',
      icons: [
        {
          src: '/manifest-icon-192.maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/manifest-icon-192.maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/manifest-icon-512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/manifest-icon-512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    icon: {
      source: '~/static/icon.png',
    },
    workbox: {
      importScripts: [
        'custom-sw.js',
      ],
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
    scrollBehavior: (_to, _from, savedPosition) => {
      if (savedPosition) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ...savedPosition,
              behavior: 'smooth',
            })
          }, 500)
        })
      } else {
        return { x: 0, y: 0 }
      }
    },
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
      routes.push({
        name: 'directory-opponents',
        path: '/directory/opponents',
        component: '@/components/PageComponents/FxOpponentPage/FxOpponentsListPage.vue',
        children: [
          {
            name: 'directory-opponents-opponentId',
            path: ':opponentId',
            component: '@/components/PageComponents/FxOpponentPage/FxOpponentIndividualPage.vue',
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

  server: {
    port: process.env.PORT || '3000',
    host: '0.0.0.0',
  },
}
