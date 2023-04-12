<template>
  <v-form
    ref="form"
    :disabled="disabled"
  >
    <v-row>
      <v-col cols="6" class="my-0 py-0">
        <label for="trialExpire">Trial Expire</label>
        <client-only>
          <v-datetime-picker v-model="datetime" date-format="dd-MM-yyyy" :text-field-props="{ outlined: true, dense: true, placeholder: 'dd-MM-yyyy HH:mm' }">
            <template #dateIcon>
              <v-icon>mdi-calendar</v-icon>
            </template>
            <template #timeIcon>
              <v-icon>mdi-clock</v-icon>
            </template>
          </v-datetime-picker>
        </client-only>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'FxSchoolTrialExpireForm',
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    formData () {
      return this.value ? this.value : { }
    },

    datetime: {
      get () {
        return this.formData.trialExpire ? DateTime.fromISO(this.formData.trialExpire).toJSDate() : null
      },
      set (val) {
        this.update('trialExpire', DateTime.fromJSDate(val).toISO())
      },
    },
  },

  methods: {
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },
  },
}
</script>
