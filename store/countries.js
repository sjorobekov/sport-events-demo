import { getData, getName, overwrite } from 'country-list'

overwrite([{
  code: 'GB',
  name: 'United Kingdom',
}])

const countries = getData().sort((a, b) => {
  return a.name > b.name ? 1 : -1
})

export const getters = {
  list: () => countries,
  name: () => code => code ? getName(code) : '',
}
