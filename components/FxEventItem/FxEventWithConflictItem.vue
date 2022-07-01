<template>
  <FxEventItem
    :event="event"
    :context-school-id="contextSchoolId"
    :me="me"
    :opponent="opponent"
  >
    <template #actions>
      <v-alert v-if="conflictsExist" dense class="mb-0 float-right">
        <v-icon color="success darken-2">
          mdi-checkbox-marked-circle-outline
        </v-icon>
        <span class="success--text text--darken-2 text-p1">No Event Conflict</span>
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
            <FxEventConflictItem
              v-for="conflict in conflicts"
              :key="conflict.eventId"
              v-model="override"
              :item="conflict"
              :context-school-id="contextSchoolId"
              class="mb-2"
              @updated="$root.$emit('conflict:updated')"
            />
          </v-col>
        </v-row>
      </template>
    </template>
  </FxEventItem>
</template>

<script>
import FxEventItem from '@/components/FxEventItem/FxEventItem'
import ListItem from '@/components/FxEventItem/ListItem'
import FxEventConflictItem from '@/components/FxEventForm/FxEventConflictItem'

export default {
  name: 'FxEventWithConflictItem',
  components: {
    FxEventItem,
    ListItem,
    FxEventConflictItem,
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
      })

      this.conflicts = status === 'CONFLICT' ? events : []
    },

    openForm () {
      this.isOpen = true
    },
  },
}
</script>
