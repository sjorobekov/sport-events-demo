<template>
  <v-container :style="style" class="rounded">
    <v-row>
      <v-col cols="12" class="border-bottom pt-1 pb-0">
        <v-list-item class="px-0">
          <v-list-item-avatar class="mr-2" tile size="24">
            <v-img :src="sport.icon" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-p2 neutral--text text--darken-3" v-text="sport.name" />
          </v-list-item-content>
          <v-spacer />
          <slot name="actions" />
        </v-list-item>
      </v-col>
    </v-row>
    <v-row v-if="!isAllHouseEvent">
      <v-col cols="12" md="3" class="border-bottom d-flex align-center">
        <FxDateFormat class="text-p2 neutral--text text--darken-4" :date="match.date" output-format="cccc dd MMMM yyyy" />
      </v-col>
      <v-col v-if="me" cols="12" md="4" class="border-bottom">
        <FxInHouseTeamListItem class="pl-0" :participant="me" :context-school-id="contextSchoolId" item-class="flex-row flex-md-row-reverse text-md-right" />
      </v-col>
      <v-col v-if="opponent" cols="12" md="5" class="border-bottom">
        <FxInHouseTeamListItem class="pl-0" :participant="opponent" :context-school-id="contextSchoolId" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" md="4" class="border-bottom d-flex align-center">
        <FxDateFormat class="text-p2" :date="match.date" output-format="cccc dd MMMM yyyy" />
      </v-col>
      <v-col cols="12" md="4" class="border-bottom d-flex align-center">
        <ListItem>
          <template #content>
            <v-list-item-title class="text-p2 neutral--text text--darken-4 font-weight-bold">
              All Houses
            </v-list-item-title>
          </template>
        </ListItem>
      </v-col>
      <v-col cols="12" md="4" class="border-bottom d-flex align-center">
        <ListItem>
          <template #content>
            <v-list-item-title class="text-p2 neutral--text text--darken-4">
              {{ event.name }}
            </v-list-item-title>
          </template>
        </ListItem>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" class="border-right border-bottom pt-1 pb-0">
        <ListItem>
          <template #icon>
            <v-icon>$vuetify.icons.clock-1</v-icon>
          </template>
          <template #content>
            <div class="d-flex">
              <div class="pr-8">
                <v-list-item-title class="text-p2 neutral--text text--darken-4">
                  {{ match.startTime }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                  Start Time
                </v-list-item-subtitle>
              </div>
              <div v-if="match.finishTime" class="">
                <v-list-item-title class="text-p2 neutral--text text--darken-4">
                  {{ match.finishTime }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                  Finish Time
                </v-list-item-subtitle>
              </div>
            </div>
          </template>
        </ListItem>
      </v-col>
      <v-col cols="12" md="4" class="border-right border-bottom pt-1 pb-0 d-flex justify-center align-center">
        <ListItem>
          <template #icon>
            <v-icon>$vuetify.icons.user-1</v-icon>
          </template>
          <template #title>
            <FxUserDisplayName :user="user" />
          </template>
        </ListItem>
      </v-col>
      <v-col cols="12" md="4" class="border-bottom pt-1 pb-0 d-flex justify-center align-center">
        <ListItem>
          <template #icon>
            <v-icon>$vuetify.icons.location-1</v-icon>
          </template>
          <template #title>
            <FxInHouseLocationLabel :match="match" />
          </template>
        </ListItem>
      </v-col>
    </v-row>
    <slot name="bottom" />
  </v-container>
</template>

<script>
import allHouses from './all_houses.svg'
import { EventType, InHouseEventType } from '@/enum'
import ListItem from '@/components/FxInHouseEventItem/ListItem'

export default {
  name: 'FxInHouseEventItemToConfirm',
  components: { ListItem },
  props: {
    match: {
      type: Object,
      default: () => { },
    },
    me: {
      type: Object,
      default: () => { },
    },
    opponent: {
      type: Object,
      default: () => { },
    },
    contextSchoolId: {
      type: String,
      required: true,
    },
    event: {
      type: Object,
      default: () => { },
    },
  },
  data: () => ({
    sport: {},
    user: {},
    EventType,
    allHousesImg: allHouses,
  }),
  computed: {
    compact () {
      return this.$vuetify.breakpoint.smAndDown
    },
    style () {
      return { borderLeft: `${this.sport?.color} 8px solid` }
    },
    isAllHouseEvent () {
      return this.event.eventType === InHouseEventType.ALL_HOUSES
    },
  },
  async created () {
    this.inHouseCompetition = await this.$store.dispatch('api/inHouseCompetitions/get', {
      schoolId: this.contextSchoolId,
      id: this.$route.params.competitionId,
    })
    this.sport = await this.$store.dispatch('api/sports/fetch', this.inHouseCompetition.sportId)
    this.user = await this.$store.dispatch('api/users/fetch', {
      schoolId: this.contextSchoolId,
      id: this.event.leadId,
    })
  },
}
</script>
