import Vue from 'vue'
import VueMatomo from 'vue-matomo'

export default ({ app, $config }) => {
  Vue.use(VueMatomo, {
    router: app.router,
    host: $config.MATOMO_HOST,
    siteId: $config.MATOMO_SITE_ID,
    disableCookies: true,
    enableLinkTracking: true,
    requireConsent: false,
    trackInitialView: true,
    requireCookieConsent: false,
    enableJSErrorTracking: true,
  })
}
