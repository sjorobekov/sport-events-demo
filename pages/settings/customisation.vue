<template>
  <div>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="text-h4 neutral--text text--darken-4 font-weight-bold">
          Customisation
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <div>
      <FxSchoolCustomisationPage
        :school="school"
        @updated="onUpdateHandler"
      />
    </div>
  </div>
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
