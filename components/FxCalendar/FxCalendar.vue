<template>
  <v-slide-group
    v-model="model"
    class="pt-4"
    mandatory
    show-arrows
  >
    <v-slide-item
      v-for="(n, i) in items"
      :key="i"
      v-slot="{ active, toggle }"
    >
      <FxCalendarItem
        style="cursor: pointer"
        :value="n"
        :active="active"
        :has-events="hasEvents[n.toFormat('yyyy-MM-dd')]"
        @click="toggle"
      />
    </v-slide-item>

    <template #next>
      <v-icon class="pb-7" x-large color="info lighten-2">
        mdi-chevron-right
      </v-icon>
    </template>
    <template #prev>
      <v-icon class="pb-7" x-large color="info lighten-2">
        mdi-chevron-left
      </v-icon>
    </template>
  </v-slide-group>
</template>

<script>
import { DateTime } from 'luxon'
import FxCalendarItem from '@/components/FxCalendar/FxCalendarItem'

export default {
  name: 'FxCalendar',
  components: { FxCalendarItem },

  props: {
    from: {
      type: Date,
      default: () => new Date(),
    },
    to: {
      type: Date,
      default: () => new Date(),
    },
    dots: {
      type: Array,
      default: () => [],
    },
    value: {
      type: DateTime,
      default: undefined,
    },
  },

  computed: {
    model: {
      set (index) {
        this.$emit('input', this.items[index])
      },
      get () {
        if (!this.value) {
          return null
        }
        return this.itemsStrings.indexOf(this.value.toFormat('yyyy-MM-dd'))
      },
    },

    hasEvents () {
      return this.dots.reduce((result, item) => {
        result[item] = true
        return result
      }, {})
    },

    fromDate () {
      return DateTime.fromJSDate(this.from)
    },

    toDate () {
      return DateTime.fromJSDate(this.to)
    },

    diffDays () {
      return this.toDate.diff(this.fromDate, 'days').days
    },

    /** @return {DateTime[]} */
    items () {
      const items = []
      let i = 0
      let date = DateTime.fromJSDate(this.from)

      do {
        items.push(date)
        date = date.plus({ days: 1 })
        i++
      } while (i < this.diffDays)

      return items
    },

    itemsStrings () {
      return this.items.map(item => item.toFormat('yyyy-MM-dd'))
    },
  },
}
</script>

<style lang="scss">
$height: 75px;

.fx-calendar .horizontal-calendar {
  height: $height;

  .date-list {
    height: $height;

    .date-list-scroll {
      height: $height;
      .date-item {
        height: $height;
      }
    }
  }
}
</style>
