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
  layout: 'admin',
  head: () => ({
    title: 'Add Student',
  }),
  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },

  methods: {
    onCreatedHandler (res) {
      this.$router.push({ name: 'management-schools-id-students', params: { id: res.schoolId } })
    },
  },
}
</script>
