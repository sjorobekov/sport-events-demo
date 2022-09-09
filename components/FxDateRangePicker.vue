<template>
  <date-range-picker
    ref="picker"
    v-model="model"
    :ranges="customRanges"
    class="fx-date-range-picker"
  >
    <template #input>
      <v-text-field
        dense
        hide-details
        prepend-inner-icon="$vuetify.icon.calendar"
        outlined
        :value="rangeFormatted"
        readonly
      />
    </template>

    <template #footer="data">
      <div class="pr-4 py-4 d-flex border-top">
        <v-spacer />
        <v-btn outlined color="primary" class="mr-2" @click="data.clickCancel">
          Cancel
        </v-btn>
        <v-btn v-if="!data.in_selection" depressed color="primary" @click="data.clickApply">
          Apply
        </v-btn>
      </div>
    </template>

    <template #ranges="ranges">
      <v-list
        nav
        dense
      >
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            v-for="(range, name) in ranges.ranges"
            :key="name"
            @click="ranges.clickRange(range)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </template>
  </date-range-picker>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
// you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'

export default {
  name: 'FxDateRangePicker',
  components: { DateRangePicker },

  props: {
    value: {
      type: Object,
      default: () => ({ startDate: null, endDate: null }),
    },
  },

  computed: {
    ...mapGetters({
      currentSeason: 'seasons/current',
    }),
    model: {
      set (value) {
        this.$emit('input', value)
      },
      get () {
        return { ...this.value }
      },
    },
    startDateFormatted () {
      if (!this.model.startDate) {
        return null
      }

      return DateTime.fromJSDate(this.model.startDate).toLocaleString(DateTime.DATE_MED)
    },

    endDateFormatted () {
      if (!this.model.endDate) {
        return null
      }
      return DateTime.fromJSDate(this.model.endDate).toLocaleString(DateTime.DATE_MED)
    },

    rangeFormatted () {
      if (!(this.startDateFormatted && this.endDateFormatted)) {
        return ''
      }
      return `${this.startDateFormatted} - ${this.endDateFormatted}`
    },

    customRanges () {
      const now = DateTime.now()
      const today = now.toJSDate()
      const tomorrow = now.plus({ days: 1 }).toJSDate()
      const yesterday = now.minus({ days: 1 }).toJSDate()
      const next7days = now.plus({ days: 7 }).toJSDate()
      const next30days = now.plus({ days: 30 }).toJSDate()
      const last7days = now.minus({ days: 7 }).toJSDate()
      const seasonStart = DateTime.fromFormat(this.currentSeason.start, 'yyyy-MM-dd').toJSDate()
      const seasonEnd = DateTime.fromFormat(this.currentSeason.end, 'yyyy-MM-dd').toJSDate()

      return {
        Today: [today, today],
        Tomorrow: [tomorrow, tomorrow],
        Yesterday: [yesterday, yesterday],
        'Next 7 Days': [tomorrow, next7days],
        'Last 7 Days': [last7days, yesterday],
        'Next 30 Days': [tomorrow, next30days],
        'This Season': [seasonStart, seasonEnd],
      }
    },
  },

}
</script>

<style>
.reportrange-text {
  border: none!important;
  background: none!important;
  padding: 0!important;
}
.fx-date-range-picker td.active {
  background-color: var(--v-primary-base)
}

.fx-date-range-picker td.active:hover {
  background-color: var(--v-primary-darken1)
}
</style>
