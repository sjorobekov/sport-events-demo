<template>
  <FxSchoolCustomisationPage
    :school="school"
    @updated="onUpdateHandler"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import FxSchoolCustomisationPage from '~/components/PageComponents/FxCustomisationPage'

export default {
  name: 'SchoolCustomisationPage',
  components: {
    FxSchoolCustomisationPage,
  },
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canCustomizeSchool'],
  },

  computed: {
    ...mapGetters({
      school: 'context/school',
    }),
  },

  methods: {
    onUpdateHandler (res) {
      this.$store.commit('context/school', res)
      this.$store.dispatch('context/applyPrimaryColor')
    },
  },
}
</script>
