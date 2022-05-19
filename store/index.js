export const actions = {
  async nuxtServerInit ({ dispatch }) {
    try {
      await dispatch('context/fetchContext')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error', e)
    }
  },
}
