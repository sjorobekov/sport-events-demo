<template>
  <v-autocomplete
    :id="id"
    :prepend-inner-icon="prependInnerIcon"
    outlined
    :dense="dense"
    :placeholder="placeholder"
    :items="items"
    :search-input.sync="search"
    :value="value"
    return-object
    item-value="id"
    item-text="name"
    @input="selectHandler"
  >
    <template #item="{ item }">
      <template v-if="typeof item !== 'object'">
        <v-list-item-content v-text="item" />
      </template>
      <template v-else>
        <FxSchoolItem v-if="!item.schoolId" :item="item" />
        <FxSchoolItem v-else-if="item.opponentSchool" :item="item.opponentSchool" />
        <FxSchoolItem v-else :item="item" />
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'FxOpponentSelect',
  events: ['update:opponentId', 'update:opponentSchoolId'],
  props: {
    id: {
      type: String,
      default: '',
    },
    prependInnerIcon: {
      type: String,
      default: 'mdi-magnify',
    },
    placeholder: {
      type: String,
      default: 'School Name',
    },

    schoolId: {
      type: String,
      required: true,
    },

    opponentId: {
      type: String,
      default: undefined,
    },

    opponentSchoolId: {
      type: String,
      default: undefined,
    },

    dense: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    opponents: [],
    schools: {},
    opponentSchoolsIndex: {},
    value: null,
    search: '',
  }),

  computed: {
    items () {
      return [
        { header: 'Opponents' },
        ...this.opponents,
        { header: 'Schools' },
        ...Object.values(this.schools),
      ]
    },
  },

  watch: {
    search (val) {
      this.query(val)
    },
  },

  async created () {
    this.opponents = await this.$store.dispatch('api/opponents/list', { schoolId: this.schoolId })

    this.opponentSchoolsIndex = this._indexSchoolOpponents(this.opponents)

    if (!this.opponentId && this.opponentSchoolId) {
      const school = await this.$store.dispatch('api/schools/get', this.opponentSchoolId)
      this.$set(this.schools, school.id, school)
    }

    await this._setInitialValue()
  },

  methods: {
    _indexSchoolOpponents (opponents) {
      return opponents
        .filter(opponent => opponent.opponentSchoolId)
        .map(item => item.opponentSchool)
        .reduce((result, school) => {
          result[school.id] = school
          return result
        }, {})
    },

    _setInitialValue () {
      this.value = this.opponentId || this.opponentSchoolId
    },

    selectHandler (val) {
      if (val?.schoolId) {
        this.$emit('update:opponentId', val?.id)
        this.$nextTick(() => {
          this.$emit('update:opponentSchoolId', val?.opponentSchoolId)
        })
      } else {
        this.$emit('update:opponentId', null)
        this.$nextTick(() => {
          this.$emit('update:opponentSchoolId', val?.id)
        })
      }
    },

    query (search) {
      this.loading = true
      this.$store.dispatch('api/schools/list', {
        search,
      })
        .then(({ data }) => {
          data.forEach((school) => {
            if (!this.opponentSchoolsIndex[school.id]) {
              this.$set(this.schools, school.id, school)
            }
          })
        })
        .catch(() => {
          this.$toast.error('Unable to fetch data')
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
