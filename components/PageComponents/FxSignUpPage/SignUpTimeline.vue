<template>
  <v-timeline
    light
    dense
  >
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      color="primary"
      fill-dot
    >
      <template #icon>
        <v-icon size="40" :color="i <= value ? 'brand2' : 'info darken-5'">
          mdi-adjust
        </v-icon>
      </template>
      <v-row class="pt-1">
        <v-col>
          <strong
            class="text-subheading font-weight-bold info--text"
            :class="i <= value ? 'white--text' : 'text--darken-5'"
          >{{ item.title }}</strong>
          <div
            class="text-p3 info--text"
            :class="i <= value ? 'white--text' : 'text--darken-5'"
          >
            {{ item.caption }}
          </div>
        </v-col>
      </v-row>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  name: 'SignUpTimeline',
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    items () {
      return [
        { title: 'Your details', caption: 'Please provide your name and email' },
        { title: 'Your school', caption: 'Find your school on fixturr' },
        { title: 'Choose a password', caption: 'Choose a secure password' },
        { title: 'Invite your team', caption: 'Add your sports department to fixturr' },
      ]
    },
  },
}
</script>

<style>
.theme--light.v-timeline::before {
  background: var(--v-info-darken5);
  margin-top: 50px;
  height: calc(100% - 100px);
}

.v-timeline-item__dot {
  background: none!important;
  box-shadow: none!important;
  height: 45px;
  width: 45px;
}
</style>
