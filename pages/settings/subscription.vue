<template>
  <div>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="text-h4">
          Subscription
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card v-if="freePlan" class="py-3 px-3 py-md-6 px-md-6">
      <FxSelectPlan />
    </v-card>

    <v-card v-else class="py-3 px-3 py-md-6 px-md-6">
      <v-card-title class="text-p3 font-weight-bold px-0 pb-2">
        Plan
      </v-card-title>

      <v-divider />
      <FxPlan :plan="plan" />

      <v-card-title class="text-p3 font-weight-bold px-0 pb-2">
        Billing Period
      </v-card-title>
      <v-divider />
      <FxBillingPeriod :details="paymentDetails" :plan="plan" />

      <v-card-title class="text-p3 font-weight-bold px-0 pb-2">
        Payment Method
      </v-card-title>
      <v-divider />
      <FxPaymentMethod :details="paymentDetails" />

      <v-card-title class="text-p3 font-weight-bold px-0 pb-2">
        Invoices
      </v-card-title>
      <v-divider />

      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">
              Date
            </th>
            <th class="text-left">
              Details
            </th>
            <th class="text-left">
              Amount
            </th>
            <th class="text-right">
              Download
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in transactions"
            :key="item.order_id"
          >
            <td><FxDateFormat :date="item.created_at" input-format="yyyy-MM-dd hh:mm:ss" output-format="dd/MM/yyyy" /></td>
            <td>{{ item.plan.name }}, <span class="text-lowercase">{{ $t(`TariffPlanPeriod.${item.plan.period}`) }}</span></td>
            <td>&#163;{{ item.amount }}</td>
            <td class="text-right">
              <v-btn text :href="item.receipt_url" target="_blank">
                Receipt - {{ item.created_at }}
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxPaymentMethod from '~/components/PageComponents/FxSubscriptionPage/FxPaymentMethod'
import FxBillingPeriod from '~/components/PageComponents/FxSubscriptionPage/FxBillingPeriod'
import FxPlan from '~/components/PageComponents/FxSubscriptionPage/FxPlan'
import FxSelectPlan from '~/components/PageComponents/FxSubscriptionPage/FxSelectPlan.vue'

export default {
  name: 'SubscriptionsPage',
  components: { FxSelectPlan, FxPlan, FxBillingPeriod, FxPaymentMethod },
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageSubscription'],
  },

  async asyncData ({ store }) {
    const school = store.getters['context/school']
    const plan = school.tariffPlanId ? await store.dispatch('api/tariffPlans/get', school.tariffPlanId) : null
    return {
      plan,
    }
  },

  data: () => ({
    paymentDetails: {},
    transactions: [],
    plan: {},
  }),

  async fetch () {
    this.transactions = await this.$store.dispatch('api/schools/getTransactions', this.school.id)
    this.paymentDetails = await this.$store.dispatch('api/schools/getPaymentDetails', this.school.id)
  },

  head () {
    return {
      title: 'Subscription',
    }
  },

  computed: {
    ...mapGetters({
      school: 'context/school',
    }),
    freePlan () {
      return this.school.isTrialActive || this.school.isFreePlan
    },
  },
}
</script>
