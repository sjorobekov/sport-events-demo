<template>
  <div class="text-center">
    <FxSchoolLogo class="mx-auto" size="64" :value="logo" :alt="name" :color="color" />
    <div class="text-center team-name px-2 px-md-6 neutral--text text--darken-4">
      {{ name }}
    </div>
  </div>
</template>

<script>
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'FxInHouseEventTeam',
  components: { FxSchoolLogo },
  props: {
    logo: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
  },
}
</script>

<style scoped lang="sass">
@import '~vuetify/src/styles/styles.sass'
.team-name
  font-size: 1.4375rem
  line-height: 1.3rem
  font-family: ProximaNova-Semibold, sans-serif

@media #{map-get($display-breakpoints, 'sm-and-down')}
  .team-name
    font-size: 0.975rem
    line-height: 1rem
</style>
