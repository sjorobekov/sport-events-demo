<template>
  <v-item-group
    v-model="selected"
    mandatory
  >
    <v-row>
      <v-col
        v-for="item in items"
        :key="item.value"
        cols="4"
        md="4"
      >
        <v-item v-slot="{ active, toggle }">
          <v-sheet v-ripple :class="active ? 'base border active' : 'base border'" @click="toggle">
            <v-container class="fill-height">
              <v-row
                align="center"
                justify="center"
              >
                <v-col class="pb-0 text-center">
                  <v-img class="mx-auto text--primary" width="50" :src="item.img" />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pt-0 text-center text--info text--darken-2">
                  <span>{{ item.text }}</span>
                </v-col>
              </v-row>
            </v-container>
            <v-btn class="float-right" icon style="position: relative; bottom: 40px;">
              <v-icon v-if="active" dark color="brand">
                $vuetify.icons.tickFilled
              </v-icon>
            </v-btn>
          </v-sheet>
        </v-item>
      </v-col>
    </v-row>
  </v-item-group>
</template>

<script>
import admin from './admin.svg'
import view from './view.svg'
import whistle from './whistle.svg'
import { ADMIN, SPORTS_USER, VIEW_ONLY } from '@/enum/UserRole'

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
        { value: ADMIN, text: 'Admin', img: admin },
        { value: SPORTS_USER, text: 'Sports User', img: whistle },
        { value: VIEW_ONLY, text: 'View Only', img: view },
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

<style lang="scss" scoped>
.base {
  height: 107px;
}
.border {
  border-radius: 4px;
  border: 1px #CBD5E1 solid;

  &.active {
    border: 3px #193F66 solid;
  }
}
</style>
