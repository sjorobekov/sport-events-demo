<template>
  <v-card>
    <v-container :style="style" class="rounded child-border">
      <v-row>
        <v-col class="pt-1 pb-0">
          <v-list-item class="px-0 neutral--text text--darken-3">
            <v-list-item-avatar class="mr-2" tile size="22">
              <v-img :src="sport.icon" />
            </v-list-item-avatar>
            <v-list-item-content class="my-n4">
              <v-list-item-title class="text-p2">
                {{ sport.name }}
                <slot name="subtitle" />
              </v-list-item-title>
            </v-list-item-content>
            <slot name="actions" />
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <FxTeamListItem :participant="meData" item-class="flex-row flex-md-row-reverse text-md-right" />
        </v-col>
        <v-col cols="12" sm="6">
          <FxTeamListItem :participant="opponent" />
        </v-col>
      </v-row>
      <v-row class="child-border-break-sm">
        <v-col class="d-flex align-center" cols="12" md="4">
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
        </v-col>
        <v-col class="d-flex align-center" cols="12" md="4">
          <ListItem>
            <template #icon>
              <v-icon>$vuetify.icons.clockOutline</v-icon>
            </template>
            <template #content>
              <div>
                <div v-if="formData.meetTime" class="d-inline-block pr-2">
                  <v-list-item-title class="text-p2 neutral--text text--darken-4">
                    {{ formData.meetTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                    Meet Time
                  </v-list-item-subtitle>
                </div>
                <div class="d-inline-block pr-2">
                  <v-list-item-title class="text-p2 neutral--text text--darken-4">
                    {{ event.startTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                    Start Time
                  </v-list-item-subtitle>
                </div>
                <div v-if="formData.returnTime" class="d-inline-block">
                  <v-list-item-title class="text-p2 neutral--text text--darken-4">
                    {{ formData.returnTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                    Return Time
                  </v-list-item-subtitle>
                </div>
              </div>
            </template>
          </ListItem>
        </v-col>
        <v-col class="d-flex align-center" cols="12" md="4">
          <ListItem>
            <template #icon>
              <FxAvatar :size="24" :value="lead.avatar" />
            </template>
            <template #title>
              <FxUserDisplayName :user="lead" />
            </template>
          </ListItem>
        </v-col>
      </v-row>
      <v-row class="child-border-break-xs">
        <v-col class="d-flex align-center" cols="12" sm="6">
          <ListItem>
            <template #icon>
              <v-icon>$vuetify.icons.locationOutline</v-icon>
            </template>
            <template #title>
              <FxSportLocationLabel
                :sport-location-id="formData.sportLocationId || event.sportLocationId"
                :event-location-type="me.eventLocation"
                :event-location-other="event.otherLocation"
              />
            </template>
            <template #subtitle>
              Location
            </template>
          </ListItem>
        </v-col>
        <v-col class="d-flex align-center" cols="12" sm="6">
          <ListItem v-if="!formData.noNeedTransport">
            <template #icon>
              <v-icon>$vuetify.icons.travel</v-icon>
            </template>
            <template #content>
              <div>
                <div class="d-inline-block pr-8">
                  <v-list-item-title class="text-p2 neutral--text text--darken-4">
                    <FxTransportToLabel :transport-to="formData.transportTo" :transport-to-other="formData.transportToOther" />
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                    Transport To
                  </v-list-item-subtitle>
                </div>
                <div class="d-inline-block">
                  <v-list-item-title class="text-p2 neutral--text text--darken-4">
                    <FxTransportFromLabel :transport-from="formData.transportFrom" :transport-from-other="formData.transportFromOther" />
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                    Transport From
                  </v-list-item-subtitle>
                </div>
              </div>
            </template>
          </ListItem>
        </v-col>
      </v-row>
      <v-row v-if="formData.info">
        <v-col>
          <ListItem>
            <template #icon>
              <v-icon>mdi-information-outline</v-icon>
            </template>
            <template #content>
              <v-list-item-title class="text-p1 neutral--text text--darken-2">
                Further Information
              </v-list-item-title>
              <span class="text-p2 neutral--text text--darken-4">{{ formData.info }}</span>
            </template>
          </ListItem>
        </v-col>
      </v-row>
      <v-row v-if="$slots.default">
        <v-col>
          <slot name="default" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItem from '~/components/FxEventItem/ListItem.vue'

export default {
  name: 'FxFixtureDetailsConfirmItem',
  components: { ListItem },
  props: {
    sport: {
      type: Object,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
    event: {
      type: Object,
      required: true,
    },
    me: {
      type: Object,
      required: true,
    },
    opponent: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    lead: {},
    team: {},
  }),

  async fetch () {
    const [lead, team] = await Promise.all([
      this.$store.dispatch('api/users/fetch', {
        schoolId: this.contextSchoolId,
        id: this.formData.leadId,
      }),
      this.$store.dispatch('api/teams/fetch', {
        schoolId: this.contextSchoolId,
        id: this.formData.teamId,
      }),
    ])

    this.lead = lead
    this.team = team
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),

    style () {
      return { borderLeft: `${this.sport?.color} 8px solid` }
    },

    meData () {
      return {
        ...this.me,
        teamId: this.formData.teamId,
      }
    },

    isMobile () {
      return this.$vuetify.breakpoint.xsOnly
    },
  },
}
</script>
