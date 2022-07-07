<template>
  <FxStudentAddPage :school-id="schoolId" @created="onCreatedHandler" />
</template>

<script>
import { mapGetters } from 'vuex'
import FxStudentAddPage from '@/components/PageComponents/FxStudentAddPage'

export default {
  name: 'SuperAdminStudentAddPage',
  components: {
    FxStudentAddPage,
  },
  head: () => ({
    title: 'Add Student',
  }),
  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },

  methods: {
    onCreatedHandler () {
      this.$router.push({ name: 'settings-students' })
    },
  },
}
</script>
