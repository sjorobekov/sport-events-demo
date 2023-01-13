<template>
  <v-list class="py-0">
    <div v-for="(item, i) in result.results" :key="i" class="pl-3 pr-4">
      <div class="hidden-md-and-up">
        <v-list-item class="px-0" style="height: 24px; min-height: initial">
          <v-list-item-content class="text-caption pa-0">
            {{ $t(`FIXTURE_TYPE.${event.fixtureType}`) }}
          </v-list-item-content>
          <v-list-item-action v-if="canSeeResults">
            <span class="text-caption result-box" :class="item.result.toLowerCase()">{{ $t(`EVENT_RESULT.${item.result}`) }}</span>
          </v-list-item-action>
        </v-list-item>
      </div>

      <v-list-item class="px-0">
        <v-list-item-avatar>
          <FxSchoolLogo :value="contextSchool.logo" :color="contextSchool.color" :alt="myTeam.name" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-p2">
            {{ myTeam.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-avatar height="40" width="60" rounded color="#F1F5F9">
            {{ item.score }}
          </v-avatar>
        </v-list-item-action>
      </v-list-item>
      <v-list-item class="px-0">
        <v-list-item-avatar>
          <FxSchoolLogo :value="opponentTeam.logo" :color="opponentTeam.color" :alt="opponentTeam.name" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-p2">
            {{ opponentTeam.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-avatar height="40" width="60" rounded color="#F1F5F9">
            {{ item.opponentScore }}
          </v-avatar>
        </v-list-item-action>
      </v-list-item>
    </div>
    <template v-if="result.resultNotes">
      <v-list-item class="border-top pt-4" style="height: 24px; min-height: initial">
        <v-list-item-content class="text-caption pa-0">
          Notes
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="text-p2">
          {{ result.resultNotes }}
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
import { PublishResult } from '~/enum'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'FixtureResult',
  components: {
    FxSchoolLogo,
  },
  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
      myTeam: 'page/event/myTeam',
      event: 'page/event/event',
      opponentTeam: 'page/event/opponentTeam',
      result: 'page/event/result',
      hasResult: 'page/event/hasResult',
      isLoggedIn: 'context/isLoggedIn',
    }),

    canSeeResults () {
      return this.isLoggedIn || PublishResult.RESULTS_SCORES === this.myTeam.publishResults
    },
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
