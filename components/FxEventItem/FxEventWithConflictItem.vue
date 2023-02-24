<template>
  <FxEventItem
    :event="event"
    :context-school-id="contextSchoolId"
    :me="me"
    :opponent="opponent"
  >
    <template #actions>
      <v-alert v-if="!conflictsExist" dense elevation="0" class="mb-0 float-right">
        <v-icon color="success darken-2">
          mdi-checkbox-marked-circle-outline
        </v-icon>
        <span class="success--text text--darken-2 text-p1">No Event Conflict</span>
      </v-alert>
      <v-alert v-else dense class="mb-0 float-right">
        <v-icon color="error">
          mdi-alert-circle-outline
        </v-icon>
        <span class="error--text text--darken-1 text-p1 font-weight-bold">Event Conflict</span>
      </v-alert>
    </template>
    <template #bottom>
      <template v-if="me.info">
        <v-row>
          <v-col class="py-0 border-bottom">
            <ListItem>
              <template #icon>
                <v-icon>mdi-information-outline</v-icon>
              </template>
              <template #content>
                <v-list-item-title class="text-p1 info--text">
                  Further Information
                </v-list-item-title>
                <span class="text-p2 info--text text--darken-2">{{ me.info }}</span>
              </template>
            </ListItem>
          </v-col>
        </v-row>
      </template>
      <template v-if="conflictsExist">
        <v-row>
          <v-col>
            <FxFixtureConflictAlert v-for="(conflict, idx) in conflicts" :key="`conflict-${conflict.eventId}`" :conflict="conflict">
              <FxFixtureConflictDialog :event-id="conflict.eventId" :conflict="conflict" @resolved="onConflictResolveHandler(idx)">
                <template #activator="{ on, attrs }">
                  <v-btn depressed v-bind="attrs" color="white" v-on="on">
                    <span class="error--text">View Details</span>
                  </v-btn>
                </template>
              </FxFixtureConflictDialog>
            </FxFixtureConflictAlert>
          </v-col>
        </v-row>
      </template>
    </template>
  </FxEventItem>
</template>

<script>
import FxEventItem from '@/components/FxEventItem/FxEventItem'
import ListItem from '@/components/FxEventItem/ListItem'
import FxFixtureConflictDialog
  from '~/components/PageComponents/FxFixtureConfirmPage/components/FxFixtureConflictDialog/FxFixtureConflictDialog.vue'
import FxFixtureConflictAlert
  from '~/components/PageComponents/FxFixtureConfirmPage/components/FxFixtureConflictAlert.vue'

export default {
  name: 'FxEventWithConflictItem',
  components: {
    FxFixtureConflictAlert,
    FxFixtureConflictDialog,
    FxEventItem,
    ListItem,
  },
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
    contextSchoolId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    conflicts: [],
    override: [],
    isOpen: false,
  }),

  computed: {
    conflictsExist () {
      return this.conflicts.length > 0
    },
  },

  watch: {
    event: {
      handler () {
        this.checkConflict()
      },
      deep: true,
    },
    me: {
      handler () {
        this.checkConflict()
      },
      deep: true,
    },
  },

  created () {
    this.checkConflict()
    this.$root.$on('conflict:updated', this.checkConflict)
  },
  beforeDestroy () {
    this.$parent.$off('conflict:updated', this.checkConflict)
  },

  methods: {
    async checkConflict () {
      const { status, events } = await this.$store.dispatch('api/events/checkConflict', {
        schoolId: this.contextSchoolId,
        date: this.event.date,
        startTime: this.event.startTime,
        sportLocationId: this.event.sportLocationId,
        teamId: this.me.teamId,
        leadId: this.me.leadId,
        meetTime: this.me.meetTime,
        endTime: this.event.endTime,
        returnTime: this.me.returnTime,
      })

      this.conflicts = status === 'CONFLICT' ? events : []
    },

    openForm () {
      this.isOpen = true
    },

    onConflictResolveHandler (idx) {
      this.conflicts.splice(idx, 1)
    },
  },
}
</script>
