<template>
  <v-container class="d-flex flex-column justify-center align-center">
    <v-row>
      <v-col class="d-flex flex-column justify-center align-center">
        <v-img width="100" :src="calendar" class="mb-3"/>
        <div class="text-p3 text-center info--text text--darken-3 mb-4">
          No Events Today
        </div>
        <v-btn
          link
          outlined
          :to="{ name: 'calendar' }"
          class="text-p1 font-weight-bold info--text text--darken-1"
        >
          Go to Calendar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import calendar from './calendar.svg'

export default {
  name: 'FxNoEventsState',
  data: () => ({
    calendar,
  }),
}
</script>
