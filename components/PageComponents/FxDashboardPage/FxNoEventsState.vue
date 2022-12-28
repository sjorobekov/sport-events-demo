<template>
  <v-container class="d-flex flex-column justify-center align-center">
    <v-row>
      <v-col class="d-flex flex-column justify-center align-center">
        <v-img width="100" :src="calendar" class="mb-3"/>
        <div class="text-p3 text-center info--text text--darken-3 mb-2">
          No Events Today
        </div>
        <div class="text-p2 text-center info--text text--darken-3 mb-4" style="width:130px">
          Try to change the date or
        </div>

        <v-btn
          link
          color="info darken-3"
          outlined
          :to="{ name: 'calendar' }"
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
