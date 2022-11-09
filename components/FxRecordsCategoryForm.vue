<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <FxSteppedFormCard>
      <template #number>
        1
      </template>
      <template #title>
        Category Name
      </template>
      <template #content>
        Enter category name
      </template>

      <label for="category">Category Name</label>
      <v-text-field
        id="category"
        v-async-validate
        :value="formData.name"
        :async-rules="[$rule.required, $rule.isRecordCategoryAvailable(schoolId)]"
        dense
        outlined
        placeholder="Category Name"
        @input="update('name', $event)"
      />
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
