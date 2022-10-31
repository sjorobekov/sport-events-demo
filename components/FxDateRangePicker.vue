<template>
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        background-color="white"
        dense
        hide-details
        prepend-inner-icon="$vuetify.icon.calendar"
        outlined
        :value="rangeFormatted"
        readonly
        v-bind="attrs"
        class="mr-2"
        v-on="on"
      />
    </template>

    <v-date-picker
      v-if="mobile"
      v-model="mobileModel"
      range
    >
      <v-spacer />
      <v-btn
        depressed
        color="primary"
        @click="$refs.menu.save(mobileModel)"
      >
        OK
      </v-btn>
    </v-date-picker>

    <date-range-picker
      v-else
      ref="picker"
      v-model="model"
      :ranges="customRanges"
      class="fx-date-range-picker"
      opens="inline"
    >
      <template #input>
        <div />
      </template>

      <template #footer="data">
        <div class="pr-4 py-4 d-flex border-top">
          <v-spacer />
          <v-btn outlined color="primary" class="mr-2" @click="data.clickCancel">
            Cancel
          </v-btn>
          <v-btn v-if="!data.in_selection" depressed color="primary" @click="data.clickApply(); $refs.menu.save(model)">
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
  </v-menu>
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
    mobile: {
      type: Boolean,
      default: false,
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
    mobileModel: {
      set (value) {
        const data = {}

        const sorted = value.sort((a, b) => a > b ? 1 : -1)

        data.startDate = DateTime.fromFormat(sorted[0], 'yyyy-MM-dd').toJSDate()

        if (sorted[1]) {
          data.endDate = DateTime.fromFormat(sorted[1], 'yyyy-MM-dd').toJSDate()
        }

        this.$emit('input', data)
      },
      get () {
        return [
          DateTime.fromJSDate(this.value.startDate).toFormat('yyyy-MM-dd'),
          ...(this.value.endDate ? [DateTime.fromJSDate(this.value.endDate).toFormat('yyyy-MM-dd')] : []),
        ].sort((a, b) => a > b ? 1 : -1)
      },
    },

    startDateFormatted () {
      if (!this.model.startDate) {
        return null
      }

      return DateTime.fromJSDate(this.model.startDate).toFormat('d MMM yyyy')
    },

    endDateFormatted () {
      if (!this.model.endDate) {
        return null
      }
      return DateTime.fromJSDate(this.model.endDate).toFormat('d MMM yyyy')
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
