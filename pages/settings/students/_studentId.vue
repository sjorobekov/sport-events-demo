<template>
  <FxStudentEditPage :school-id="schoolId" @updated="onUpdatedHandler" />
</template>

<script>
import { mapGetters } from 'vuex'
import FxStudentEditPage from '@/components/PageComponents/FxStudentEditPage'

export default {
  name: 'SettingsStudentEditPage',
  components: { FxStudentEditPage },
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageStudents'],
  },
  head: () => ({ title: 'Edit Student' }),
  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },

  methods: {
    onUpdatedHandler () {
      this.$router.push({ name: 'settings-students' })
    },
  },
}
</script>
