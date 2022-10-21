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

      <v-row>
        <v-col cols="12" sm="4">
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
        </v-col>
        <v-col cols="12" sm="4">
          <label for="event">Event</label>
          <v-autocomplete
            id="event"
            v-async-validate
            :async-rules="[$rule.required]"
            outlined
            dense
            :value="formData.sportsRecordEventId"
            :items="events"
            item-text="name"
            item-value="id"
            placeholder="Select Event"
            @input="update('sportsRecordEventId', $event)"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <label for="category">Category</label>
          <v-autocomplete
            id="category"
            v-async-validate
            :async-rules="[$rule.required]"
            outlined
            dense
            :value="formData.sportsRecordCategoryId"
            :items="categories"
            item-text="name"
            item-value="id"
            placeholder="Select Category"
            @input="update('sportsRecordCategoryId', $event)"
          />
        </v-col>
      </v-row>
    </FxSteppedFormCard>

    <FxSteppedFormCard>
      <template #number>
        2
      </template>
      <template #title>
        Record Information
      </template>
      <template #content>
        Enter a name for this compeition
      </template>

      <v-row>
        <v-col cols="12" sm="6">
          <label for="student">Student</label>
          <v-autocomplete
            id="student"
            v-async-validate
            :async-rules="[$rule.required]"
            outlined
            dense
            :value="formData.studentId"
            :items="students"
            :item-text="fullname"
            item-value="id"
            placeholder="Select Student"
            @input="update('studentId', $event)"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <label for="score">Sports Record</label>
          <v-text-field
            id="score"
            v-async-validate
            :value="formData.score"
            :async-rules="[$rule.required]"
            dense
            outlined
            placeholder="Score/Time"
            @input="update('score', $event)"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <label for="date">Record Date</label>
          <v-menu ref="menu" offset-y :close-on-content-click="false">
            <template #activator="{ on, attrs }">
              <v-text-field
                id="date"
                v-async-validate
                :value="date"
                readonly
                outlined
                dense
                v-bind="attrs"
                placeholder="DD-MM-YYYY"
                :async-rules="[$rule.required]"
                v-on="on"
              />
            </template>
            <v-date-picker
              ref="picker"
              :value="formData.date"
              @input="update('date', $event)"
            />
          </v-menu>
        </v-col>
      </v-row>
    </FxSteppedFormCard>
  </v-form>
</template>

<script>
import { DateTime } from 'luxon'
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
    events: {
      type: Array,
      default: () => [],
    },
    categories: {
      type: Array,
      default: () => [],
    },
    students: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    formData () {
      return {
        ...(this.value || {}),
      }
    },
    date () {
      return this.formData.date ? DateTime.fromISO(this.formData.date).toFormat('dd-MM-yyyy') : ''
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },
    fullname (item) {
      return `${item.firstname} ${item.lastname}`
    },
  },
}
</script>
