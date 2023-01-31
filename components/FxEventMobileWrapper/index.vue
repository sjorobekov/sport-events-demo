<template>
  <wrapped-component :wrap="isMobile">
    <template #wrapper>
      <FxEventMobileContainer />
    </template>

    <slot name="default" />
  </wrapped-component>
</template>

<script>
import FxEventMobileContainer from './FxEventMobileContainer.vue'
export default {
  name: 'FxEventMobileWrapper',

  components: {
    FxEventMobileContainer,
  },

  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
