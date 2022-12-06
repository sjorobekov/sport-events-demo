<template>
  <div>
    <component :is="item.component" :error="error" />
  </div>
</template>

<script>
import PageNotFound from '@/components/PageComponents/Errors/PageNotFound'
import UnknownError from '@/components/PageComponents/Errors/UnknownError'

export default {
  name: 'EmptyLayout',
  components: {
    PageNotFound,
    UnknownError,
  },
  layout ({ store }) {
    if (store.getters['context/isPortalSite']) {
      return 'default'
    }

    if (store.getters['context/isSuperAdminSite']) {
      return 'admin'
    }

    if (store.getters['context/isSignUpSite']) {
      return 'startup'
    }
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
      pages: {
        404: {
          title: 'Oops, page can\'t be found',
          component: 'PageNotFound',
        },
        unknown: {
          title: 'Unknown Error',
          component: 'UnknownError',
        },
      },
    }
  },

  head () {
    const title = this.item.title
    return {
      title,
    }
  },

  computed: {
    item () {
      return this.pages[this.error.statusCode] || this.pages.unknown
    },
  },
}
</script>
