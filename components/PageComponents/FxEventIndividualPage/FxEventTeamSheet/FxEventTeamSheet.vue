<template>
  <div>
    <FxEventItemCard>
      <template #title>
        Team Sheet <FxTeamSheetPrivacyChip v-if="canManageTeamSheet" :protected="teamSheetProtected" />
      </template>
      <template v-if="canManageTeamSheet && teamSheet.length" #actions>
        <v-btn outlined link :to="{ name: 'events-eventId-sheet', params: { eventId: event.id } }">
          <v-icon>mdi-pencil</v-icon>Edit Team
        </v-btn>
      </template>
      <GuestLoginForm v-if="!showTeamSheet" @signedIn="$fetch" />
      <TeamSheet v-else :team-sheet="teamSheet" />
    </FxEventItemCard>
    <v-btn
      v-if="canManageTeamSheet && teamSheet.length"
      outlined
      block
      height="50"
      class="mt-4 hidden-md-and-up"
      link
      :to="{ name: 'events-eventId-sheet', params: { eventId: event.id } }"
    >
      <v-icon small>
        mdi-pencil
      </v-icon>Edit Team
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxEventItemCard from '@/components/PageComponents/FxEventIndividualPage/FxEventItemCard'
import TeamSheet from '@/components/PageComponents/FxEventIndividualPage/FxEventTeamSheet/TeamSheet'
import GuestLoginForm from '@/components/PageComponents/FxEventIndividualPage/FxEventTeamSheet/GuestLoginForm'
import FxTeamSheetPrivacyChip from '@/components/FxTeamSheetPrivacyChip'

export default {
  name: 'FxEventTeamSheet',
  components: { GuestLoginForm, TeamSheet, FxEventItemCard, FxTeamSheetPrivacyChip },
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
      teamSheetProtected: 'context/isSheetPasswordProtected',
      myTeam: 'page/event/myTeam',
    }),
  },
}
</script>
