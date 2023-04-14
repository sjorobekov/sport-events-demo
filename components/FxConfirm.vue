<template>
  <v-dialog v-model="isOpen" width="588">
    <v-card flat>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon @click="cancel">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="mt-6 info--text text--darken-2">
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn outlined @click="cancel">
          Cancel
        </v-btn>
        <v-btn depressed color="primary" @click="confirm">
          {{ confirmButtonLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'FxConfirm',

  data: () => ({
    message: '',
    title: '',
    confirmButtonLabel: '',
    isOpen: false,
    resolve: null,
    reject: null,
  }),

  methods: {
    open (message, title, confirmButtonLabel) {
      this.message = message
      this.title = title
      this.confirmButtonLabel = confirmButtonLabel
      this.isOpen = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },

    cancel () {
      this.resolve(false)
      this.isOpen = false
    },

    confirm () {
      this.resolve(true)
      this.isOpen = false
    },
  },
}
</script>
