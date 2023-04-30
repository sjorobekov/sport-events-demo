<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab>Yearly billing</v-tab>
      <v-tab>Monthly billing</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="mt-5">
      <v-tab-item v-for="i in [0, 1]" :key="i">
        <div class="d-flex" style="gap: 12px">
          <v-card
            v-for="plan in grouped[i]"
            :key="plan.id"
            width="300"
          >
            <v-card-title class="text-h4">
              {{ plan.name }}
            </v-card-title>

            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ plan.numberOfUsers || 'Unlimited' }}</v-list-item-title>
                  <v-list-item-subtitle>Users</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ plan.numberOfTeamsPerSeason || 'Unlimited' }}</v-list-item-title>
                  <v-list-item-subtitle>Teams</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ plan.numberOfCompetitionsPerSeason || 'Unlimited' }}</v-list-item-title>
                  <v-list-item-subtitle>Competitions</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ plan.integrations ? 'Yes' : 'No' }}</v-list-item-title>
                  <v-list-item-subtitle>Integrations</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider />
            <v-list-item>
              <v-list-item-content class="text-right">
                <v-list-item-title class="text-h4">
                  &#163;{{ plan.price.GBP }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ plan.period === TariffPlanPeriod.MONTH ? 'per month' : 'annually' }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <div />
              <v-spacer />
              <v-btn depressed color="primary" :disabled="loading" @click="upgrade(plan.id)">
                Upgrade
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-tab-item>
    </v-tabs-items>
    <FxAdditionalSecurityModal ref="additionalSecurityModal" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TariffPlanPeriod } from '~/enum'

export default {
  name: 'FxSelectPlan',

  data: () => ({
    /** @type {TariffPlan[]} */
    plans: [],
    billingType: TariffPlanPeriod.MONTH,
    tab: 0,
    TariffPlanPeriod,

    loading: false,
    grouped: {
      0: [],
      1: [],
    },
  }),
  async fetch () {
    const plans = await this.$store.dispatch('api/tariffPlans/list')

    const monthly = plans.filter(plan => plan.period === TariffPlanPeriod.MONTH)
    const yearly = plans.filter(plan => plan.period === TariffPlanPeriod.YEAR)

    this.grouped = {
      0: yearly,
      1: monthly,
    }
  },

  computed: {
    ...mapGetters({
      me: 'context/me',
      school: 'context/school',
    }),
    filtered () {
      return this.plans.filter(plan => plan.period === this.billingType)
    },
  },

  methods: {
    async upgrade (planId) {
      this.loading = true
      const confirmed = await this.$refs.additionalSecurityModal.open()
        .catch((e) => {
          console.error(e)
        })

      if (confirmed) {
        const { url } = await this.$store.dispatch('api/paddle/generatePayLink', {
          planId,
          returnUrl: window.location.href,
        })
        window.open(url, '_self')
      }

      this.loading = false
    },
  },
}
</script>

<style scoped>
.theme--light.v-tabs-items {
  background: none;
}
.v-tab:before {
  opacity: 0!important;
}
.v-tab:hover {
  color: var(--v-primary-base)!important;
}
</style>
