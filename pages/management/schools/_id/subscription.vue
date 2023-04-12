<template>
  <div>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="text-h4">
          Subscription
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card v-if="school.isTrialActive || school.isFreePlan" class="pb-8 px-6 pt-6">
      <v-card-title class="px-0 text-p3 font-weight-bold pb-1">
        Trial
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
            class="text-p2 info--text px-0"
          >
            Set Trial Expire Date
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="pr-0"
          >
            <FxSchoolTrialExpireForm ref="form" v-model="paymentDetails" :disabled="loading" />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="pt-0 pr-0 mt-8">
        <v-spacer />
        <v-btn
          depressed
          color="primary"
          dark
          class="ml-2"
          :loading="loading"
          @click="save()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>

    <template v-else>
      <div>
        <v-card class="py-3 px-3 py-md-6 px-md-6">
          <v-card-title class="text-p3 font-weight-bold px-0 pb-2">
            Plan
          </v-card-title>

          <v-card-subtitle class="text-right px-0">
            Subscription ID: {{ paymentDetails.subscription_id }}
          </v-card-subtitle>

          <v-divider />
          <FxPlan v-if="!$fetchState.pending" :plan="tariffPlan" />

          <v-card-title class="text-p3 font-weight-bold px-0 pb-2">
            Billing Period
          </v-card-title>
          <v-divider />
          <FxBillingPeriod v-if="!$fetchState.pending" :details="paymentDetails" :plan="tariffPlan" />

          <v-card-title class="text-p3 font-weight-bold px-0 pb-2">
            Payment Method
          </v-card-title>
          <v-divider />
          <FxPaymentMethod v-if="!$fetchState.pending" :details="paymentDetails" hide-change-payment-button />

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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxSchoolTrialExpireForm from '~/components/PageComponents/Management/School/FxSchoolTrialExpireForm.vue'
import FxPlan from '~/components/PageComponents/FxSubscriptionPage/FxPlan.vue'
import FxBillingPeriod from '~/components/PageComponents/FxSubscriptionPage/FxBillingPeriod.vue'
import FxPaymentMethod from '~/components/PageComponents/FxSubscriptionPage/FxPaymentMethod.vue'

export default {
  name: 'SchoolSubscription',
  components: { FxPaymentMethod, FxBillingPeriod, FxPlan, FxSchoolTrialExpireForm },
  layout: 'admin',

  data: () => ({
    paymentDetails: {},
    tariffPlan: {},
    loading: false,
    transactions: [],
  }),

  async fetch () {
    this.paymentDetails = await this.$store.dispatch('api/schools/getPaymentDetails', this.school.id)
    if (this.school.tariffPlanId) {
      this.tariffPlan = await this.$store.dispatch('api/tariffPlans/get', this.school.tariffPlanId)
      this.transactions = await this.$store.dispatch('api/schools/getTransactions', this.school.id)
    }
  },

  computed: {
    ...mapGetters({
      school: 'context/school',
    }),
  },

  methods: {
    save () {
      this.loading = true

      this.$store.dispatch('api/schools/setTrialExpire', this.paymentDetails)
        .then((res) => {
          this.paymentDetails = {
            ...res,
          }
          this.$store.dispatch('context/fetchSchool', this.school.id)
          this.$toast('Updated!')
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
