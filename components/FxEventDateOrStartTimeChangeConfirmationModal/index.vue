<template>
  <v-dialog
    :value="isOpen"
    overlay-color="white"
    opacity="0.8"
    persistent
    width="520"
  >
    <v-card flat>
      <v-card-text class="text-center pt-16">
        <v-img class="d-inline-block mx-auto mb-8" width="120" :src="icon" />

        <p class="text-h3 info--text text--darken-3">
          Update event time or date?
        </p>
        <p class="text-h4s info--text font-weight-medium">
          You will change this event for you and the opponent school.
        </p>
      </v-card-text>
      <v-card-actions class="pb-10 justify-center">
        <v-btn outlined @click="cancel">
          No, Cancel Changes
        </v-btn>
        <v-btn depressed color="primary" @click="confirm">
          Yes, Confirm Changes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import icon from './icon.svg'

export default {
  name: 'FxEventDateOrStartTimeChangeConfirmationModal',

  data: () => ({
    isOpen: false,
    resolve: null,
    icon,
  }),

  methods: {
    open () {
      this.isOpen = true
      return new Promise((resolve) => {
        this.resolve = resolve
      })
    },

    confirm () {
      this.resolve(true)
      this.isOpen = false
    },

    cancel () {
      this.resolve(false)
      this.isOpen = false
    },
  },
}
</script>
