<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <FxSteppedFormCard>
      <template #number>
        1
      </template>
      <template #title>
        Event Name
      </template>
      <template #content>
        Enter category name
      </template>

      <div class="d-flex flex-column">
        <label for="sport">Sport</label>
        <v-autocomplete
          id="sport"
          v-async-validate
          :async-rules="[$rule.required]"
          outlined
          dense
          :value="formData.sportId"
          :items="sports"
          item-text="name"
          item-value="id"
          placeholder="Select Sport"
          @input="update('sportId', $event)"
        />
        <label for="category">Event Name</label>
        <v-text-field
          id="event"
          v-async-validate
          :value="formData.name"
          :async-rules="[$rule.required, $rule.isRecordEventAvailable(schoolId, formData.sportId)]"
          dense
          outlined
          placeholder="Event Name"
          @input="update('name', $event)"
        />
      </div>
    </FxSteppedFormCard>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FxRecordsCategoryForm',

  props: {
    value: {
      type: Object,
      default: () => {},
    },
    sports: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
    formData () {
      return {
        ...(this.value || {}),
      }
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },
  },
}
</script>
