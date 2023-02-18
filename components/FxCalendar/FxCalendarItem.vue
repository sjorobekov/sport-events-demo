<template>
  <div class="text-p1 info--text text--darken-1 font-weight-bold text-center" style="height: 104px; width: 40px" role="radio" @click="$emit('click', $event)">
    <div class="mb-2">
      {{ day }}
    </div>
    <div class="mb-2 date align-center d-inline-block" :class="{ active }">
      {{ date }}
    </div>
    <div class="">
      {{ month }}
    </div>
    <v-icon color="error" class="mt-1 mr-1" x-small :class="{ hidden: !hasEvents }">
      $vuetify.icons.ellipse
    </v-icon>
    <div class="selected mt-1" :class="{ active }" />
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'FxCalendarItem',
  props: {
    value: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
    hasEvents: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    parsedDate () {
      return DateTime.fromFormat(this.value, 'yyyy-MM-dd')
    },

    month () {
      return this.parsedDate.toFormat('MMM')
    },

    date () {
      return this.parsedDate.day
    },

    day () {
      return this.parsedDate.toFormat('EEE')
    },
  },
}
</script>

<style scoped>
.active {
  background-color: var(--v-primary-base);
  color: white!important;
}
.date {
  width: 24px;
  height: 24px;
  border-radius:12px 12px 12px 12px;
  line-height: 24px;
}
.selected {
  height: 4px;
}
.selected.active {
  background: var(--v-primary-base);
  border-radius: 8px 8px 0 0 ;
}
.hidden {
  visibility: hidden;
}
</style>
