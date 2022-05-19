<template>
  <v-dialog v-model="dialog" width="320">
    <v-card flat>
      <v-toolbar outlined flat>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-color-picker
          v-model="color"
          show-swatches
          mode="hexa"
          hide-mode-switch
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn depressed color="primary" @click="select">
          Select
        </v-btn>
      </v-card-actions>
    </v-card>

    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="{ on, attrs }" />
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: 'FxColorPicker',
  props: {
    value: {
      type: String,
      default: '#910000',
    },
  },
  data: () => ({
    visible: false,
    color: '#910000',
  }),
  computed: {
    dialog: {
      set (val) {
        if (val) {
          this.color = this.value
        }
        this.visible = val
      },
      get () {
        return this.visible
      },
    },
  },
  methods: {
    select () {
      this.$emit('input', this.color)
      this.dialog = false
    },
  },
}
</script>
