<template>
  <div class="d-flex px-6">
    <div class="flex-grow-1">
      <div class="pb-0 pt-4">
        <FxTeamListItem v-if="opponent" class="px-0" :context-school-id="contextSchoolId" :participant="opponent">
          <template v-if="$slots.action" #action>
            <div class="hidden-md-and-up">
              <slot name="action" />
            </div>
          </template>
        </FxTeamListItem>
      </div>
      <div class="pb-4 ml-3">
        <div class="d-inline-block">
          <ListItem>
            <template #icon>
              <v-icon>$vuetify.icons.calendarRoundedOutline</v-icon>
            </template>
            <template #title>
              <FxDateFormat :date="event.date" />
            </template>
            <template #subtitle>
              Date
            </template>
          </ListItem>
        </div>

        <div class="d-inline-block">
          <ListItem>
            <template #icon>
              <v-icon>$vuetify.icons.clockOutline</v-icon>
            </template>
            <template #title>
              {{ event.startTime }}
            </template>
            <template #subtitle>
              Start Time
            </template>
          </ListItem>
        </div>

        <div class="d-inline-block">
          <ListItem>
            <template #icon>
              <v-icon>$vuetify.icons.whistleAlert</v-icon>
            </template>
            <template #title>
              {{ sport.name }}
            </template>
            <template #subtitle>
              Sport
            </template>
          </ListItem>
        </div>

        <div class="d-inline-block">
          <ListItem>
            <template #icon>
              <v-icon>$vuetify.icons.teamOutline</v-icon>
            </template>
            <template #title>
              {{ event.age }}{{ event.ability }}
            </template>
            <template #subtitle>
              Age & Ability
            </template>
          </ListItem>
        </div>

        <div class="d-inline-block">
          <ListItem>
            <template #icon>
              <v-icon>$vuetify.icons.locationOutline</v-icon>
            </template>
            <template v-if="location" #title>
              <span v-if="eventLocation">{{ eventLocation }} - </span>{{ location.name }}
            </template>
            <template v-else #title>
              Add Location
            </template>
            <template #subtitle>
              Location
            </template>
          </ListItem>
        </div>
      </div>
    </div>
    <div v-if="$slots.action" class="flex-shrink-1 align-center justify-center hidden-sm-and-down d-md-flex">
      <slot name="action" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItem from '~/components/FxEventItem/ListItem.vue'

export default {
  name: 'FxFixtureToConfirmItem',
  components: { ListItem },
  props: {
    event: {
      type: Object,
      default: () => {},
    },
    me: {
      type: Object,
      default: () => {},
    },
    opponent: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
    eventLocation () {
      const locations = {
        HOME: 'Home',
        NEUTRAL: 'Neutral',
        AWAY: 'Away',
      }
      return this.me.eventLocation ? locations[this.me.eventLocation] : ''
    },

    location () {
      return this.event.sportLocation
    },

    team () {
      return this.me.team
    },

    sport () {
      return this.event.sport
    },
  },
}
</script>
