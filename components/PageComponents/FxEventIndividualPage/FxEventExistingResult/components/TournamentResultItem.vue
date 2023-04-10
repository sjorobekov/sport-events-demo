<template>
  <div class="pt-3 pb-4 px-4">
    <div>
      <v-list-item class="px-0" style="height: 24px; min-height: initial">
        <v-list-item-content class="text-caption pa-0">
          {{ item.round }}
        </v-list-item-content>
        <v-list-item-action>
          <span class="text-caption result-box" :class="item.result.toLowerCase()">{{ $t(`EVENT_RESULT.${item.result}`) }}</span>
        </v-list-item-action>
      </v-list-item>
    </div>

    <div class="d-md-inline-block">
      <v-list-item class="px-0">
        <v-list-item-avatar size="32" class="order-md-1 mr-2">
          <FxSchoolLogo size="32" :value="contextSchool.logo" :color="contextSchool.color" :alt="myTeam.name" />
        </v-list-item-avatar>
        <v-list-item-content class="mr-4">
          <v-list-item-title class="text-p2 neutral--text text--darken-3">
            {{ myTeam.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar class="order-last neutral--text text--darken-4" height="40" width="60" rounded color="neutral lighten-2">
          {{ item.score }}
        </v-list-item-avatar>
      </v-list-item>
    </div>

    <FxOpponentProvider
      v-slot="{ opponentName, logo, color }"
      class="d-md-inline-block"
      :opponent-school-id="item.opponentSchoolId"
      :opponent-id="item.opponentId"
    >
      <v-list-item class="px-0">
        <v-list-item-avatar size="32" class="mr-2">
          <FxSchoolLogo size="32" :value="logo" :color="color" :alt="opponentName" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-p2 neutral--text text--darken-3">
            {{ opponentName }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar class="order-last order-md-first mr-md-4 neutral--text text--darken-4" height="40" width="60" rounded color="neutral lighten-2">
          {{ item.opponentScore }}
        </v-list-item-avatar>
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

<style scoped lang="scss">
.result-box {
  border-radius: 6px;
  padding: 2px 8px 2px 8px;

  &.win {
    color: var(--v-success-darken2);
    box-shadow: 0 0 0 1px var(--v-success-base);
  }

  &.draw {
    color: var(--v-info-darken1);
    box-shadow: 0 0 0 1px var(--v-info-lighten1);
  }

  &.lost {
    color: var(--v-error-darken2);
    box-shadow: 0 0 0 1px var(--v-error-base);
  }
}
</style>
