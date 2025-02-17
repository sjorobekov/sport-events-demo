import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import VuetifyAsyncValidation from 'vuetify-async-validation'
import { isMobilePhone, isURL, isEmail, isAlphanumeric } from 'validator'
import { PUBLIC_DOMAINS } from '~/common'
import { Primitive } from '~/types'

type ReturnType = boolean | string
type AsyncReturnType = Promise<ReturnType>
Vue.use(VuetifyAsyncValidation, {
  debounceInterval: 1200, // ms
})

declare module 'vue/types/vue' {
  interface Vue {
    $rule: {
      required: Function,
      isEmailAvailable: Function,
      email: Function,
      url: Function,
      phone: Function,
      minLength: Function,
      equal: Function,
      alphaNumeric: Function,
      isSubdomainAvailable: Function,
      nonAssociatedEmailDomain: Function,
      nonStudentEmail: Function,
    }
    validateAsync: Function,
  }
}

const myPlugin: Plugin = ({ $axios }, inject) => {
  const rule = {
    required (v: Primitive): ReturnType {
      return !!v || 'Required'
    },

    isEmailAvailable (id: string) {
      return async (email: string): AsyncReturnType => {
        if (!email) {
          return true
        }
        const { available } = await $axios.$post('/api/v1/validation/check_email', { email, id })
        return available || 'Email is unavailable'
      }
    },

    email (v: string): ReturnType {
      return (!v || isEmail(v)) || 'Invalid email'
    },

    phone (v: string): ReturnType {
      return (!v || isMobilePhone(v)) || 'Invalid phone number'
    },

    url (v: string): ReturnType {
      return (!v || isURL(v)) || 'Invalid url'
    },

    alphaNumeric (v: string): ReturnType {
      return (!v || isAlphanumeric(v)) || 'Must contain only letters and numbers'
    },

    nonAssociatedEmailDomain (v: string): ReturnType {
      if (!v) {
        return true
      }

      const [, domain] = v.split('@')
      if (!domain) {
        return true
      }

      return !(PUBLIC_DOMAINS.includes(domain)) || 'Please enter your school email address'
    },

    nonStudentEmail (v: string): ReturnType {
      if (!v) {
        return true
      }

      const [, domain] = v.split('@')
      if (!domain) {
        return true
      }

      return !(domain.includes('student')) || 'Invalid e-mail'
    },

    minLength (len: number) {
      return (val: string): ReturnType => {
        if (!val) {
          return true
        }
        return val.length >= len || `Length must be at least ${len} symbols`
      }
    },

    equal (val1: Primitive) {
      return (val: Primitive): ReturnType => {
        if (!val) {
          return true
        }
        return val1 === val || 'Fields are not equal'
      }
    },

    isSubdomainAvailable (id: string) {
      return async (portalAddress: string): AsyncReturnType => {
        if (!portalAddress) {
          return true
        }
        const { available } = await $axios.$post('/api/v1/validation/check_portal', { portalAddress, id })
        return available || 'Address is unavailable'
      }
    },

    isRecordCategoryAvailable (schoolId: string) {
      return async (name: string): AsyncReturnType => {
        if (!name) {
          return true
        }
        const { available } = await $axios.$post('/api/v1/validation/check_sports_record_category', { name, schoolId })
        return available || 'Category already exists'
      }
    },

    isRecordEventAvailable (schoolId: string, sportId: string) {
      return async (name: string): AsyncReturnType => {
        if (!name) {
          return true
        }
        const { available } = await $axios.$post('/api/v1/validation/check_sports_record_event', { name, schoolId, sportId })
          .catch(() => { return 'Event already exists' })
        return available || 'Event already exists'
      }
    },
  }

  inject('rule', rule)
}

export default myPlugin
