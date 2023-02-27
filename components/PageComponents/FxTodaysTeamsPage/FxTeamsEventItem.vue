<template>
  <FxTeamsEventItemCard>
    <template #title>
      <ListItem>
        <template #title>
          {{ me.team.name }}
        </template>
        <template v-if="opponent && opponent.school" #subtitle>
          vs {{ opponent.school.name }}
        </template>
      </ListItem>
    </template>

    <template #list>
      <FxTeamsEventTeamSheet :value="event" />
    </template>

    <v-container>
      <v-row>
        <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
          <ListItem>
            <template #icon>
              <v-img width="24" height="24" :src="event.sport.icon" />
            </template>
            <template #title>
              {{ event.sport.name }}
            </template>
            <template #subtitle>
              Sport
            </template>
          </ListItem>
        </v-col>
        <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
          <ListItem>
            <template #icon>
              <v-icon>$vuetify.icons.calendar-1</v-icon>
            </template>
            <template #title>
              <FxDateFormat :date="event.date" />
            </template>
            <template #subtitle>
              Date
            </template>
          </ListItem>
        </v-col>
        <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
          <ListItem>
            <template #icon>
              <v-icon>$vuetify.icons.clock-1</v-icon>
            </template>
            <template #content>
              <div>
                <div v-if="me.meetTime" class="d-inline-block pr-8">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ me.meetTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Meet Time
                  </v-list-item-subtitle>
                </div>
                <div class="d-inline-block pr-8">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ event.startTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Start Time
                  </v-list-item-subtitle>
                </div>
                <div v-if="me.returnTime" class="d-inline-block">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ me.returnTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Return Time
                  </v-list-item-subtitle>
                </div>
              </div>
            </template>
          </ListItem>
        </v-col>
        <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
          <ListItem>
            <template #icon>
              <FxAvatar :size="24" :value="lead.avatar" />
            </template>
            <template #title>
              {{ lead.firstname }} {{ lead.lastname }}
            </template>
            <template #subtitle>
              Lead Staff Member
            </template>
          </ListItem>
        </v-col>
        <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
          <ListItem>
            <template #icon>
              <v-icon>$vuetify.icons.location-1</v-icon>
            </template>
            <template #title>
              <FxLocationLabel :event="event" :me="me" />
            </template>
            <template #subtitle>
              Location
            </template>
          </ListItem>
        </v-col>
        <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
          <ListItem v-if="!me.noNeedTransport">
            <template #icon>
              <v-icon>$vuetify.icons.transport-1</v-icon>
            </template>
            <template #content>
              <div>
                <div class="d-inline-block pr-8">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ transportTo }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Transport To
                  </v-list-item-subtitle>
                </div>
                <div class="d-inline-block">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ transportFrom }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Transport From
                  </v-list-item-subtitle>
                </div>
              </div>
            </template>
          </ListItem>
        </v-col>
        <v-col cols="12" class="border-right pt-1 pb-0">
          <ListItem>
            <template #icon>
              <v-icon>$vuetify.icons.directory-outline</v-icon>
            </template>
            <template #title>
              Further Information
            </template>
            <template #subtitle>
              {{ event.info }}
            </template>
          </ListItem>
        </v-col>
      </v-row>
    </v-container>
  </FxTeamsEventItemCard>
</template>

<script>
import { TransportType } from '@/enum'
import ListItem from '@/components/FxEventItem/ListItem'
import FxAvatar from '@/components/FxAvatar/FxAvatar'
import FxLocationLabel from '@/components/FxEventItem/FxLocationLabel'
import FxTeamsEventTeamSheet from '@/components/PageComponents/FxTodaysTeamsPage/FxTeamsEventTeamSheet'
import FxTeamsEventItemCard from '@/components/PageComponents/FxTodaysTeamsPage/FxTeamsEventItemCard'

export default {
  name: 'FxTeamsEventItem',
  components: {
    FxAvatar,
    ListItem,
    FxLocationLabel,
    FxTeamsEventTeamSheet,
    FxTeamsEventItemCard,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    event () {
      return this.value
    },
    me () {
      return this.event.me
    },
    opponent () {
      return this.event.opponent
    },
    lead () {
      return this.me.lead
    },
    transportTo () {
      if (this.me.transportTo === TransportType.OTHER) {
        return this.me.transportToOther
      }
      return this.$t(`TRANSPORT_TO.${this.me.transportTo}`)
    },
    transportFrom () {
      if (this.me.transportFrom === TransportType.OTHER) {
        return this.me.transportFromOther
      }
      return this.$t(`TRANSPORT_FROM.${this.me.transportTo}`)
    },
  },
}
</script>
