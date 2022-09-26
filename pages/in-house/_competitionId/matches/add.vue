<template>
  <FxInHouseEventAddPage
    :context-school-id="schoolId"
    :competition-id="$route.params.competitionId"
    @saved="onSave"
    @cancel="onCancel"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import FxInHouseEventAddPage from '@/components/PageComponents/FxInHouseEventAddPage'
export default {
  name: 'InHouseEventAddPage',
  components: {
    FxInHouseEventAddPage,
  },
  layout: 'default',
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canCreateInHouseEvent'],
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },

  methods: {
    onSave () {
      this.$router.push({ name: 'in-house-competitionId-events', params: { competitionId: this.$route.params.competitionId } })
    },
    onCancel () {
      this.$router.back()
    },
  },
}
</script>
