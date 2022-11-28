<template>
  <FxInHouseEventItemToConfirm
    :event="event"
    :context-school-id="contextSchoolId"
    :match="match"
    :me="me"
    :opponent="opponent"
  >
    <template #bottom>
      <template v-if="event.info">
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
                <span class="text-p2 info--text text--darken-2">{{ event.info }}</span>
              </template>
            </ListItem>
          </v-col>
        </v-row>
      </template>
    </template>
  </FxInHouseEventItemToConfirm>
</template>

<script>
import FxInHouseEventItemToConfirm from '@/components/FxInHouseEventItem/FxInHouseEventItemToConfirm'
import ListItem from '@/components/FxInHouseEventItem/ListItem'

export default {
  name: 'FxInHouseEventWithConflictItem',
  components: {
    FxInHouseEventItemToConfirm,
    ListItem,
  },
  props: {
    event: {
      type: Object,
      default: () => {},
    },
    match: {
      type: Object,
      default: () => {},
    },
    contextSchoolId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    isOpen: false,
    teams: [],
  }),

  computed: {
    me () {
      return this.teams.find(team => team.id === this.match.homeTeamId)
    },
    opponent () {
      return this.teams.find(team => team.id === this.match.awayTeamId)
    },
  },

  async beforeMount () {
    this.teams = await this.$store.dispatch('api/inHouseTeams/list', {
      schoolId: this.contextSchoolId,
    })
  },

  methods: {
    openForm () {
      this.isOpen = true
    },
  },
}
</script>
