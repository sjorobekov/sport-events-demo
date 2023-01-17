<template>
  <nuxt-link class="text-decoration-none" :to="to">
    <v-container :style="style" class="rounded child-border">
      <v-row>
        <v-col cols="12" class="pt-1 pb-0">
          <v-list-item class="px-2">
            <v-list-item-avatar class="mr-3" tile size="22">
              <v-img :src="sport.icon" />
            </v-list-item-avatar>
            <v-list-item-content class="">
              <v-list-item-title class="text-p2">
                {{ sport.name }}
                <slot name="subtitle" />
              </v-list-item-title>
            </v-list-item-content>
            <slot name="actions" />
          </v-list-item>
        </v-col>
      </v-row>
      <slot name="default" />
    </v-container>
  </nuxt-link>
</template>

<script>
export default {
  name: 'EventContainer',
  props: {
    sport: {
      type: Object,
      required: true,
    },
    to: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    style () {
      return { borderLeft: `${this.sport?.color} 8px solid` }
    },
  },
}
</script>
