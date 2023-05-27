<template>
  <v-item-group
    :value="value"
    mandatory
    @change="$emit('input', $event)"
  >
    <FxSheetOption
      v-for="item in items"
      :key="item.value"
      :src="item.img"
      :text="item.text"
      :value="item.value"
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
        { value: UserRole.SPORTS_USER, text: 'Team Member', img: whistle },
        { value: UserRole.VIEW_ONLY, text: 'View Only', img: view },
      ],
    },
  },
}
</script>
