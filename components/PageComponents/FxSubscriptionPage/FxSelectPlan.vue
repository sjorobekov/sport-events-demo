<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab class="font-weight-bold">
        Yearly Billing
      </v-tab>
      <v-tab class="font-weight-bold">
        Monthly Billing
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="mt-5">
      <v-tab-item v-for="i in [0, 1]" :key="i">
        <div class="d-block d-sm-flex" style="gap: 12px">
          <v-card
            v-for="plan in grouped[i]"
            :key="plan.id"
            width="300"
            class="mb-4 mb-md-0"
          >
            <v-card-title class="text-h4 font-weight-bold">
              {{ plan.name }}
            </v-card-title>

            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="neutral--text text--darken-4">
                    {{ plan.numberOfUsers || 'Unlimited' }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="neutral--text text--darken-3">
                    Users
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="neutral--text text--darken-4">
                    {{ plan.numberOfTeamsPerSeason || 'Unlimited' }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="neutral--text text--darken-3">
                    Teams
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="neutral--text text--darken-4">
                    {{ plan.numberOfCompetitionsPerSeason || 'Unlimited' }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="neutral--text text--darken-3">
                    Competitions
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="neutral--text text--darken-4">
                    {{ plan.integrations ? 'Yes' : 'No' }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="neutral--text text--darken-3">
                    Integrations
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider />
            <v-list-item>
              <v-list-item-content class="text-right">
                <v-list-item-title class="text-h4 neutral--text text--darken-4 font-weight-bold">
                  &#163;{{ plan.price.GBP }}
                </v-list-item-title>
                <v-list-item-subtitle class="neutral--text text--darken-3">
                  {{ plan.period === TariffPlanPeriod.MONTH ? 'per month' : 'annually' }}
                </v-list-item-subtitle>
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
        const signedUrl = await this.$store.dispatch('api/paddle/makePayLinkSignedUrl', {
          planId,
          returnUrl: this.getCheckoutUrl({ redirectTo: encodeURI(window.location.href) }),
        })

        const { url: override } = await this.$store.dispatch('api/paddle/generatePayLink', signedUrl)
        window.open(this.getCheckoutUrl({ override }), '_self')
      }

      this.loading = false
    },
    getCheckoutUrl ({ override, redirectTo }) {
      const url = new URL(this.$config.PORTAL_WILDCARD.replace('*', 'checkout'))
      if (override) {
        url.searchParams.set('override', override)
      }
      if (redirectTo) {
        url.searchParams.set('redirectTo', redirectTo)
      }
      return url.href
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
