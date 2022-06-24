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
  layout: 'admin',

  computed: {
    ...mapGetters({
      schoolId: 'admin/page/school/id',
    }),
  },

  methods: {
    onSave () {
      this.$router.push({ name: 'management-schools-id-events' })
    },
    onCancel () {
      this.$router.back()
    },
  },
}
</script>
