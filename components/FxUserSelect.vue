<template>
  <v-autocomplete
    :id="id"
    outlined
    dense
    :value="value"
    :items="items"
    :search-input.sync="search"
    item-text="firstname"
    item-value="id"
    :placeholder="placeholder"
    :loading="loading"
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
  },
  data: () => ({
    items: [],
    search: null,
    loading: false,
  }),
  watch: {
    search (val) {
      this.query(val)
    },
  },

  async created () {
    await this.query()

    if (!this.value) {
      return
    }

    if (this.items.some(item => item.id === this.value)) {
      return
    }
    this.loading = true
    try {
      const user = await this.$store.dispatch('api/users/get', {
        schoolId: this.schoolId,
        id: this.value,
      })
      this.items.push(user)
    } catch (e) {
      this.$toast.error('Unable to fetch data')
    } finally {
      this.loading = false
    }
  },

  methods: {
    query (search) {
      this.loading = true
      this.$store.dispatch('api/users/list', {
        schoolId: this.schoolId,
        params: { search },
      })
        .then(({ data }) => {
          this.items = data
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
