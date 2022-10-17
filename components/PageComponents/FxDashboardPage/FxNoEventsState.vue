<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column justify-center align-center">
        <v-img width="100" :src="calendar" />
        <div class="font-weight-bold">
          No Events Today
        </div>
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
