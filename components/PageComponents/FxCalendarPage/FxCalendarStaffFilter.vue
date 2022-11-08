<template>
  <v-select
    dense
    outlined
    hide-details
    multiple
    placeholder="Staff"
    prepend-inner-icon="$vuetify.icons.staff"
    :items="users"
    :item-text="fullname"
    background-color="white"
    item-value="id"
    chips
    :value="value"
    deletable-chips
    @input="$emit('input', $event)"
  >
    <template #item="{ item, on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-action class="mr-2">
          <v-checkbox :value="attrs.inputValue" />
        </v-list-item-action>
        <v-list-item-avatar size="24" class="mr-2">
          <FxAvatar size="24" :value="item.avatar" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.firstname }} {{ item.lastname }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
import { mapGetters } from 'vuex'
import FxAvatar from '@/components/FxAvatar/FxAvatar'

export default {
  name: 'FxCalendarStaffFilter',
  components: { FxAvatar },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    users: [],
  }),

  async fetch () {
    await this.fetchItems()
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },
  watch: {
    items: {
      deep: true,
      async handler () {
        await this.fetchItems()
      },
    },
  },

  methods: {
    fullname (item) {
      return `${item.firstname} ${item.lastname}`
    },

    async fetchItems () {
      this.users = await Promise.all(this.items.filter(id => !!id).map((id) => {
        return this.$store.dispatch('api/users/fetch', {
          id,
          schoolId: this.schoolId,
        })
      }))
    },
  },
}
</script>
