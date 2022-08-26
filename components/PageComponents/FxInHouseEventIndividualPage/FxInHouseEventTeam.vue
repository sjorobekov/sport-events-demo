<template>
  <div class="text-center">
    <FxSchoolLogo class="mx-auto" size="64" :value="logo" :alt="name" :color="color" />
    <div class="text-h5 info--text text--darken-2">
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
