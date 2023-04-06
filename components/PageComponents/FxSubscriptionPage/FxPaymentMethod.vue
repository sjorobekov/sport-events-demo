<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="5" class="text-p2 info--text px-0">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
      </v-col>

      <v-col cols="12" lg="7" class="px-0">
        <v-list-item class="text-right px-0 mb-4">
          <v-list-item-content class="py-0">
            <v-list-item-title v-if="paymentInformation.payment_method === 'card'" class="text-p2 font-weight-bold">
              {{ paymentInformation.card_type }} **** **** **** {{ paymentInformation.last_four_digits }}
            </v-list-item-title>
            <v-list-item-title v-else-if="paymentInformation.payment_method === 'paypal'" class="text-p2 font-weight-bold">
              PayPal
            </v-list-item-title>
            <v-list-item-title v-else class="text-p2 font-weight-bold">
              Other
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-btn class="float-right" outlined :href="details.update_url" target="_blank">
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
  },

  computed: {
    paymentInformation () {
      return this.details.payment_information || {}
    },
  },
}
</script>
