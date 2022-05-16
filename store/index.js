export const actions = {
  async nuxtServerInit ({ dispatch }) {
    try {
      await dispatch('context/fetchContext')
    } catch (e) {
      console.log('error', e)
    }
  },
}
