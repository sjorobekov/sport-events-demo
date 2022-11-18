import MobileDetect from 'mobile-detect'
import { Plugin } from '@nuxt/types'
import { DeviceType } from '~/enum'

const devicePlugin: Plugin = ({ req, store }) => {
  const md = new MobileDetect(req.headers['user-agent'] || '')
  const isMobile = md.phone() !== null || md.mobile() === 'UnknownMobile'
  const isTablet = md.tablet() !== null || md.mobile() === 'UnknownTablet'

  if (isMobile) {
    store.commit('context/device', DeviceType.MOBILE)
  } else if (isTablet) {
    store.commit('context/device', DeviceType.TABLET)
  } else {
    store.commit('context/device', DeviceType.DESKTOP)
  }
}

export default devicePlugin
