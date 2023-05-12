<template>
  <v-stepper
    light
    dense
    color="neutral"
  >
    <v-stepper-header>
      <template
        v-for="(item, i) in items"
      >
        <v-stepper-step
          :key="i"
          :step="i+1"
          :complete="i < value"
          color="brandgreen"
        >
          {{ item.title }}
        </v-stepper-step>
        <v-divider
          v-if="i + 1 !== items.length"
          :key="`${i}-divider`"
        />
      </template>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
export default {
  name: 'SignUpStepper',
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
<style scoped>
.v-stepper__header{
  box-shadow: none!important;
  background-color: #333C4D!important;
}
.v-sheet.v-stepper:not(.v-sheet--outlined) {
  box-shadow: none!important;
}
.theme--light.v-stepper {
  border-radius: 0!important;
}
</style>
