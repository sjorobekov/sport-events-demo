export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('context/fetchContext').catch((e) => {
      // eslint-disable-next-line no-console
      if (e.response?.status !== 401) {
        console.log('error', e)
      }
    })

    await dispatch('seasons/fetch').catch((e) => {
      // eslint-disable-next-line no-console
      console.log('error', e)
    })
  },
}
