<template>
  <FxStudentEditPage :school-id="schoolId" @remove="onRemoveHandler" />
</template>

<script>
import { mapGetters } from 'vuex'
import FxStudentEditPage from '@/components/PageComponents/FxStudentEditPage'

export default {
  name: 'SuperAdminStudentEditPage',
  components: { FxStudentEditPage },
  layout: 'admin',
  head: () => ({ title: 'Edit Student' }),
  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },

  methods: {
    onRemoveHandler () {
      this.$router.push({ name: 'management-schools-id-students' })
    },
  },
}
</script>
