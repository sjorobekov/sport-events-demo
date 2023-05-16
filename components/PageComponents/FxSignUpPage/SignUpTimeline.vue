<template>
  <v-timeline
    light
    dense
    class="signup-timeline"
  >
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      color="branddark"
      fill-dot
    >
      <template #icon>
        <v-icon size="40" :color="i <= value ? 'brandgreen' : 'neutral darken-1'">
          mdi-adjust
        </v-icon>
      </template>
      <v-row class="pt-1">
        <v-col class="py-5">
          <strong
            class="text-subheading font-weight-bold neutral--text"
            :class="i <= value ? 'white--text' : 'text--darken-1'"
          >{{ item.title }}</strong>
          <div
            class="text-p3 neutral--text"
            :class="i <= value ? 'white--text' : 'text--darken-1'"
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
        { title: 'Your Details', caption: 'Please provide your name and email' },
        { title: 'Your School', caption: 'Find your school on Fixturr' },
        { title: 'Choose a Password', caption: 'Choose a secure password' },
        { title: 'Invite Your Team', caption: 'Add your sports department to Fixturr' },
      ]
    },
  },
}
</script>

<style scoped lang="sass">
::v-deep.signup-timeline.v-timeline::before
  background: #ffffff30
  margin-top: 50px
  height: calc(100% - 100px)

  .v-timeline-item__dot
    background: none!important
    box-shadow: none!important
    height: 45px
    width: 45px
</style>
