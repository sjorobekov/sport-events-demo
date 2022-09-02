<template>
  <v-card outlined>
    <v-list class="py-0">
      <FxListGroup
        v-for="(group) in groups"
        :key="group"
        no-action

        class="child-border"
      >
        <template #activator>
          <v-list-item-content>
            <v-list-item-title class="text-p1 font-weight-bold info--text text--darken-3">
              <template v-if="group === 'null'">
                No Year Group
              </template>
              <template v-else-if="group === 'recent'">
                Previously Selected for {{ teamName }}
              </template>
              <template v-else>
                Year {{ group }}
              </template>
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn outlined @click.stop="addAll(group)">
              <v-icon>$vuetify.icons.studentAdd</v-icon>Add All
            </v-btn>
          </v-list-item-action>
        </template>

        <v-list-item-group
          :value="value"
          multiple
          prepend-icon="mdi-chevron-down"
          class="box-shadow"
          @change="$emit('input', $event)"
        >
          <template v-for="(item, i) in grouped[group]">
            <v-divider v-if="i" :key="`divider-${item.id}`" />

            <FxStudentListItem
              :key="`item-${item.id}`"
              :student="item"
              :value="item.id"
              class="px-2"
            >
              <template #action="{ active, toggle }">
                <v-btn color="info darken-1" outlined @click.stop="toggle">
                  <template v-if="active">
                    <v-icon>mdi-check</v-icon> Student Added
                  </template>
                  <template v-else>
                    <v-icon>$vuetify.icons.studentAdd</v-icon> Add Student To Event
                  </template>
                </v-btn>
              </template>
            </FxStudentListItem>
          </template>
        </v-list-item-group>
        <v-divider />
      </FxListGroup>
    </v-list>
  </v-card>
</template>

<script>
import groupBy from 'lodash/groupBy'
export default {
  name: 'FxGroupedTeamSheetSelect',
  props: {
    items: {
      type: Array,
      default: () => [],
    },

    recent: {
      type: Array,
      default: () => [],
    },

    value: {
      type: Array,
      default: () => [],
    },

    teamName: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    grouped: {},
    groups: [],
  }),

  watch: {
    items: {
      handler () {
        this.grouped = groupBy(this.items, 'yearGroup')
        this.groups = Object.keys(this.grouped).sort((a, b) => a - b)
        this.grouped.recent = this.recent
        this.groups.unshift('recent')
      },
      deep: true,
    },
  },

  methods: {
    addAll (group) {
      const result = [...this.value]
      this.grouped[group].forEach((student) => {
        if (!result.find(item => item === student.id)) {
          result.push(student.id)
        }
      })
      this.$emit('input', result)
    },
  },
}
</script>

<style scoped>
.box-shadow {
  box-shadow: inset 3px 3px 8px rgba(0, 0, 0, 0.14);
}

.child-border:not(:nth-last-of-type(1)) {
  border-bottom: 1px solid var(--v-info-lighten3);
}
</style>
