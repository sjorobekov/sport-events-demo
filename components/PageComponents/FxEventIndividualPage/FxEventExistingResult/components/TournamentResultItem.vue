<template>
  <div class="border-bottom pt-3 pb-4">
    <div>
      <v-list-item style="height: 24px; min-height: initial">
        <v-list-item-content class="text-caption pa-0">
          {{ item.round }}
        </v-list-item-content>
        <v-list-item-action>
          <span class="text-caption result-box">{{ $t(`EVENT_RESULT.${item.result}`) }}</span>
        </v-list-item-action>
      </v-list-item>
    </div>

    <div class="d-inline-block">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-p2">
            {{ myTeam.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar class="ml-4">
          <FxSchoolLogo :value="contextSchool.logo" :color="contextSchool.color" :alt="myTeam.name" />
        </v-list-item-avatar>

        <v-list-item-avatar size="40" rounded color="#F1F5F9">
          {{ item.score }}
        </v-list-item-avatar>
      </v-list-item>
    </div>

    <FxOpponentProvider
      v-slot="{ opponentName, logo, color }"
      class="d-inline-block"
      :opponent-school-id="item.opponentSchoolId"
      :opponent-id="item.opponentId"
    >
      <v-list-item>
        <v-list-item-avatar size="40" rounded color="#F1F5F9">
          {{ item.opponentScore }}
        </v-list-item-avatar>
        <v-list-item-avatar size="32">
          <FxSchoolLogo size="32" :value="logo" :color="color" :alt="opponentName" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-p2">
            {{ opponentName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </FxOpponentProvider>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'TournamentResultItem',
  components: { FxSchoolLogo },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
      myTeam: 'page/event/myTeam',
    }),
  },
}
</script>

<style scoped>
.result-box {
  border-radius: 6px;
  padding: 2px 8px 2px 8px;
  color: var(--v-info-darken1);
  box-shadow: 0 0 0 1px var(--v-info-lighten1);
}
</style>
