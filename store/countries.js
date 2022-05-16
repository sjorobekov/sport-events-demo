import { getData, getName } from 'country-list'

export const getters = {
  list: () => getData(),
  name: () => code => code ? getName(code) : '',
}
