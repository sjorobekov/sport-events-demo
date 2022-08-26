<template>
  <v-list-group>
    <template #activator>
      <v-list-item-title>
        <template v-if="group === 'null'">
          No Year Group
        </template>
        <template v-else>
          Year {{ group }}
        </template>
      </v-list-item-title>
    </template>
    <v-list-item-group
      :value="value"
      multiple
      prepend-icon="mdi-chevron-down"
      :value-comparator="comparator"
      class="box-shadow"
      @change="$emit('input', $event)"
    >
      <div v-for="item in grouped[group]" :key="item.id">
        <FxStudentListItem
          :student="item"
          :value="item"
          class="px-2"
          active-class="active"
        >
          <template #action="data">
            <v-btn color="info darken-1" outlined>
              <template v-if="data.active">
                <v-icon>mdi-check</v-icon> Student Added
              </template>
              <template v-else>
                <v-icon>$vuetify.icons.studentAdd</v-icon> Add Student To Event
              </template>
            </v-btn>
          </template>
        </FxStudentListItem>
        <v-divider />
      </div>
    </v-list-item-group>
    <v-divider />
  </v-list-group>
</template>

<script>
export default {
  name: 'FxGroupedTeamSheetSelectGroup',
}
</script>
