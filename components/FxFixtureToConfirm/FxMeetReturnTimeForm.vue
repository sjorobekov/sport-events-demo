<template>
  <div>
    <v-btn
      v-if="!showForm"
      text
      class="text-p1 font-weight-medium"
      color="info darken-1"
      @click="showForm = true"
    >
      Set Meet & Return Time
    </v-btn>

    <template v-if="showForm">
      <v-row>
        <v-col>
          <label>Meet Time</label>
          <v-text-field
            v-model="formData.meetTime"
            dense
            type="time"
            hide-details
            outlined
            placeholder="Meet Time"
          />
        </v-col>
        <v-col>
          <label>Return Time</label>
          <v-text-field
            v-model="formData.returnTime"
            dense
            type="time"
            hide-details
            outlined
            placeholder="Return Time"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn text block @click="update()">
            Update
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  name: 'FxMeetReturnTimeForm',
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    showForm: false,
    formData: { meetTime: null, returnTime: null },
  }),

  watch: {
    showForm: {
      handler (val) {
        if (val) {
          this.formData = {
            meetTime: this.value.meetTime,
            returnTime: this.value.returnTime,
          }
        }
      },
    },
  },

  methods: {
    update () {
      this.$emit('input', {
        ...this.value,
        ...this.formData,
      })
      this.showForm = false
    },
  },
}
</script>
