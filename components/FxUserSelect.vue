<template>
  <v-autocomplete
    :id="id"
    v-async-validate
    outlined
    dense
    :value="value"
    :items="items"
    :async-rules="asyncRules"
    :search-input.sync="search"
    item-text="firstname"
    item-value="id"
    :placeholder="placeholder"
    :loading="loading"
    :hide-details="hideDetails"
    @input="$emit('input', $event)"
  >
    <template #selection="{ item }">
      <span>{{ item.firstname }} {{ item.lastname }}</span>
    </template>
    <template #item="{ item }">
      <FxUserItem :item="item" />
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'FxUserSelect',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: '',
    },
    schoolId: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    asyncRules: {
      type: Array,
      default: () => [],
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    users: {},
    search: null,
    loading: false,
  }),

  computed: {
    items () {
      return Object.values(this.users)
    },
  },
  watch: {
    search (val) {
      this.query(val)
    },
    value () {
      this.getUser()
    },
  },

  created () {
    this.query()
  },

  async beforeMount () {
    await this.getUser()
  },

  methods: {
    query (search) {
      this.loading = true
      this.$store.dispatch('api/users/list', {
        schoolId: this.schoolId,
        params: { search },
      })
        .then(({ data }) => {
          data.forEach((user) => {
            this.$set(this.users, user.id, user)
          })
        })
        .catch(() => {
          this.$toast.error('Unable to fetch data')
        })
        .finally(() => {
          this.loading = false
        })
    },

    async getUser () {
      if (!this.value || this.users[this.value]) {
        return
      }

      try {
        const user = await this.$store.dispatch('api/users/get', {
          schoolId: this.schoolId,
          id: this.value,
        })

        this.$set(this.users, user.id, user)
      } catch (e) {
        this.$toast.error('Unable to fetch data')
      }
    },
  },
}
</script>
