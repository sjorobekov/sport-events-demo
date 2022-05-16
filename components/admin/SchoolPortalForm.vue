<template>
  <v-form ref="form" v-async-form :disabled="disabled" lazy-validation>
    <v-row class="fill-height" align="center" justify="center">
      <v-col>
        <label for="portal">Fixturr Portal is <strong>{{ formData.portal ? 'Enabled' : 'Disabled' }}</strong></label>
      </v-col>
      <v-col>
        <v-switch id="portal" v-model="formData.portal" class="float-right" color="success" inset />
      </v-col>
    </v-row>

    <div v-if="formData.portal">
      <label class="caption" for="portal_address">Fixturr Portal Address</label>
      <v-text-field
        id="portal_address"
        v-model="formData.portalAddress"
        v-async-validate
        :disabled="!formData.portal"
        :async-rules="[$rule.required, $rule.alphaNumeric, $rule.isSubdomainAvailable(formData.id)]"
        dense
        outlined
        suffix=".fixturr.com"
      />
    </div>
  </v-form>
</template>

<script>
export default {
  name: 'SchoolFormOne',
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

  computed: {
    formData: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', { ...val })
      },
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
  },
}
</script>
