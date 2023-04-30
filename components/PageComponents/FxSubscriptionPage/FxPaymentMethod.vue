<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="5" class="text-p2 neutral--text text--darken-3 px-0 pr-5">
        Your current payment method for Fixturr.
      </v-col>

      <v-col cols="12" lg="7" class="px-0">
        <v-list-item class="text-right px-0 mb-4">
          <v-list-item-content class="py-0">
            <v-list-item-title v-if="paymentInformation.payment_method === 'card'" class="text-p2 font-weight-bold neutral--text text--darken-4">
              {{ paymentInformation.card_type }} **** **** **** {{ paymentInformation.last_four_digits }}
            </v-list-item-title>
            <v-list-item-title v-else-if="paymentInformation.payment_method === 'paypal'" class="text-p2 font-weight-bold neutral--text text--darken-4">
              PayPal
            </v-list-item-title>
            <v-list-item-title v-else class="text-p2 font-weight-bold neutral--text text--darken-4">
              Other
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-btn v-if="details.update_url && !hideChangePaymentButton"
          class="float-right"
          color="neutral darken-3"
          outlined
          :href="details.update_url"
          target="_blank"
          >
          Change Payment Method
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FxPaymentMethod',
  props: {
    details: {
      type: Object,
      required: true,
    },
    hideChangePaymentButton: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    paymentInformation () {
      return this.details.payment_information || {}
    },
  },
}
</script>
