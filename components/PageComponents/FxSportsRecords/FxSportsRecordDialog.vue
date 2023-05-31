<template>
  <FxMobilePageDialog :value="value" title="Sports Record" @click:back="$emit('click:back', $event)">
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="{ on, attrs }" />
    </template>
    <v-card>
      <v-list class="py-0 child-border">
        <v-list-item>
          <v-list-item-avatar v-if="item.sport.icon" size="24">
            <v-img :src="item.sport.icon" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="neutral--text text--darken-4">
              {{ item.sportsRecordEvent.name }} - {{ item.sport.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="neutral--text text--darken-2">
              Sport & Event
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-4">
            <v-icon>$vuetify.icons.students-small</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="neutral--text text--darken-4">
              {{ item.sportsRecordCategory.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="neutral--text text--darken-2">
              Category
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-4">
            <v-icon>$vuetify.icons.user-1</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="neutral--text text--darken-4">
              <span v-if="item.student">{{ item.student.firstname }} {{ item.student.lastname }}</span>
              <span v-else>{{ item.studentName }}</span>
            </v-list-item-title>
            <v-list-item-subtitle class="neutral--text text--darken-2">
              Student
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-4">
            <v-icon>$vuetify.icons.clock-1</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="neutral--text text--darken-4">
              {{ item.score }}
            </v-list-item-title>
            <v-list-item-subtitle class="neutral--text text--darken-2">
              Record (Score/Time)
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-4">
            <v-icon>$vuetify.icons.calendar-1</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="neutral--text text--darken-4">
              <FxDateFormat :date="item.date" output-format="dd-MM-yyyy" class="text-no-wrap" />
            </v-list-item-title>
            <v-list-item-subtitle class="neutral--text text--darken-2">
              Date Achieved
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </FxMobilePageDialog>
</template>

<script>
import FxMobilePageDialog from '@/components/FxMobilePageDialog'

export default {
  name: 'FxSportsRecordDialog',
  components: {
    FxMobilePageDialog,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
