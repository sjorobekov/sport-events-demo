export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('context/fetchContext').catch((e) => {
      if (e.response?.status !== 401) {
        // eslint-disable-next-line no-console
        console.log('error', e)
      }
    })

    await dispatch('seasons/fetch').catch((e) => {
      // eslint-disable-next-line no-console
      console.log('error', e)
    })
  },
}
