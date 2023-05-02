<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="5" class="text-p2 neutral--text text--darken-3 px-0 pr-5">
        Your current billing period and the date your next payment is due.
      </v-col>

      <v-col cols="12" lg="7" class="px-0">
        <v-list-item class="text-right px-0 mb-4">
          <v-list-item-content class="py-0">
            <v-list-item-title class="text-p2 font-weight-bold neutral--text text--darken-4">
              &#163;{{ plan.price.GBP }} - {{ $t(`TariffPlanPeriod.${plan.period}`) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p2 neutral--text text--darken-3">
              <span v-if="nextPayment"> Next Payment: {{ nextPayment }}</span>
              <span v-else>&nbsp;</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'FxBillingPeriod',
  props: {
    details: {
      type: Object,
      required: true,
    },
    plan: {
      type: Object,
      required: true,
    },
  },

  computed: {
    nextPayment () {
      if (!this.details?.next_payment) {
        return
      }
      return DateTime.fromFormat(this.details.next_payment.date, 'yyyy-MM-dd').toFormat('dd/MM/yyyy')
    },
  },
}
</script>
