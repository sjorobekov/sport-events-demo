<template>
  <v-item-group
    v-model="selected"
    mandatory
  >
    <FxSheetOption
      v-for="item in items"
      :key="item.value"
      :src="item.img"
      :text="item.text"
    />
  </v-item-group>
</template>

<script>
import admin from './admin.svg'
import view from './view.svg'
import whistle from './whistle.svg'
import { UserRole } from '@/enum'

export default {
  name: 'FxUserRoleSelect',
  props: {
    value: {
      type: String,
      default: undefined,
    },

    items: {
      type: Array,
      default: () => [
        { value: UserRole.ADMIN, text: 'Admin', img: admin },
        { value: UserRole.SPORTS_USER, text: 'Sports User', img: whistle },
        { value: UserRole.VIEW_ONLY, text: 'View Only', img: view },
      ],
    },
  },

  computed: {
    selected: {
      set (val) {
        this.$emit('input', this.items[val].value)
      },
      get () {
        return this.items.findIndex(item => item.value === this.value)
      },
    },
  },
}
</script>
