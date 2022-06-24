<template>
  <FxEventAddPage
    :context-school-id="schoolId"
    @saved="onSave"
    @cancel="onCancel"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import FxEventAddPage from '@/components/PageComponents/FxEventAddPage'
export default {
  name: 'AdminEventPage',
  components: {
    FxEventAddPage,
  },
  layout: 'default',
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canCreateEvent'],
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },

  methods: {
    onSave (teamId) {
      this.$router.push({ name: 'teams-id', params: { id: teamId } })
    },
    onCancel () {
      this.$router.back()
    },
  },
}
</script>
