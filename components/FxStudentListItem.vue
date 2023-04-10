<template>
  <v-list-item
    v-slot="{ active, toggle }"
    class="px-0"
    :value="value"
    :active-class="activeClass"
    inactive
    :ripple="false"
  >
    <v-list-item-icon v-if="$slots.icon" class="mx-0 student-icon">
      <slot name="icon" />
    </v-list-item-icon>
    <v-icon size="24" class="ml-2 mr-3">
      $vuetify.icons.user-1
    </v-icon>
    <v-list-item-content>
      <v-list-item-title class="text-p1 neutral--text text--darken-3">
        {{ item.firstname }} {{ item.lastname }}
      </v-list-item-title>
      <v-list-item-subtitle v-if="item.yearGroup" class="text-p1 neutral--text text--darken-2">
        Year {{ item.yearGroup }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <slot name="action" v-bind="{ active, toggle }" />
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'FxStudentListItem',
  props: {
    student: {
      type: Object,
      default: undefined,
    },
    studentId: {
      type: String,
      default: undefined,
    },
    schoolId: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
    activeClass: {
      type: String,
      default: undefined,
    },
  },

  data: () => ({
    loaded: null,
  }),

  async fetch () {
    if (this.studentId) {
      this.loaded = await this.$store.dispatch('api/students/fetch', {
        schoolId: this.schoolId,
        id: this.studentId,
      })
    }
  },

  computed: {
    item () {
      return this.student || this.loaded || {}
    },
  },
}
</script>
