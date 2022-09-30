<template>
  <FxEventItemCard>
    <template #title>
      Team Sheet <FxTeamPublishChip v-if="canManageTeamSheet" :publish-team="myTeam.publishTeam" />
    </template>
    <template v-if="canManageTeamSheet && teamSheet.length" #actions>
      <v-btn outlined link :to="{ name: 'events-eventId-sheet', params: { eventId: event.id } }">
        <v-icon>mdi-pencil</v-icon>Edit Team
      </v-btn>
    </template>
    <GuestLoginForm v-if="!showTeamSheet" @signedIn="$fetch" />
    <TeamSheet v-else :team-sheet="teamSheet" />
  </FxEventItemCard>
</template>

<script>
import { mapGetters } from 'vuex'
import FxEventItemCard from '@/components/PageComponents/FxEventIndividualPage/FxEventItemCard'
import TeamSheet from '@/components/PageComponents/FxEventIndividualPage/FxEventTeamSheet/TeamSheet'
import GuestLoginForm from '@/components/PageComponents/FxEventIndividualPage/FxEventTeamSheet/GuestLoginForm'

export default {
  name: 'FxEventTeamSheet',
  components: { GuestLoginForm, TeamSheet, FxEventItemCard },
  data: () => ({
    teamSheet: [],
    showTeamSheet: true,
  }),
  async fetch () {
    await this.$store.dispatch('api/events/getTeamSheet', {
      schoolId: this.contextSchoolId,
      id: this.event.id,
    })
      .then((teamSheet) => {
        this.showTeamSheet = true
        this.teamSheet = teamSheet
      }).catch((e) => {
        if (e.response?.status === 403) {
          this.showTeamSheet = false
        }
      })
  },
  computed: {
    ...mapGetters({
      event: 'page/event/event',
      canManageTeamSheet: 'page/event/canManageTeamSheet',
      contextSchoolId: 'context/schoolId',
      myTeam: 'page/event/myTeam',
    }),
  },
}
</script>
