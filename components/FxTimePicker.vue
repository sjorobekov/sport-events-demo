<template>
  <v-sheet color="white" width="120" class="pa-3">
    <v-row no-gutters class="fill-height" align="center" justify="center">
      <v-col>
        <div class="d-flex">
          <v-btn icon @click="hourUp">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn icon @click="minuteUp">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </div>

        <v-text-field
          class="centered-input"
          :value="value"
          hide-details
          outlined
          dense
          readonly
          placeholder="HH:mm"
        />
        <div class="d-flex">
          <v-btn icon @click="hourDown">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn icon @click="minuteDown">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </div>
        <slot name="actions" />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
const SEPARATOR = ':'

export default {
  name: 'FxTimePicker',

  props: {
    value: {
      type: String,
      default: undefined,
    },
  },

  computed: {
    formData: {
      get () {
        return (this.value || '09:00').split(SEPARATOR)
      },

      set (val) {
        this.$emit('input', val.join(SEPARATOR))
      },
    },

    hours: {
      get () {
        return Number(this.formData[0])
      },
      set (val) {
        let hours = val
        if (hours > 23) {
          hours = 0
        } else if (hours < 0) {
          hours = 23
        }

        this.formData = [
          String(hours).padStart(2, '0'),
          this.formData[1],
        ]
      },
    },

    minutes: {
      get () {
        return Number(this.formData[1])
      },
      set (val) {
        let minutes = val
        if (minutes > 59) {
          minutes = 0
        } else if (minutes < 0) {
          minutes = 59
        }

        this.formData = [
          this.formData[0],
          String(minutes).padStart(2, '0'),
        ]
      },
    },
  },

  methods: {
    hourUp () {
      this.hours += 1
    },

    hourDown () {
      this.hours -= 1
    },

    minuteUp () {
      this.minutes += 1
    },

    minuteDown () {
      this.minutes -= 1
    },
  },
}
</script>

<style scoped>
/deep/ .centered-input input {
  text-align: center;
}
</style>
