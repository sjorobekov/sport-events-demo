<template>
  <div class="top-bar disable-dbl-tap-zoom" :class="{ 'is-hidden': !showHeader }" :style="styles">
    <slot name="default" />
  </div>
</template>

<script>
import { convertToUnit } from 'vuetify/src/util/helpers.ts'

export default {
  name: 'FxTopBar',

  data: () => ({
    showHeader: true,
    lastScrollPosition: 0,
    scrollOffset: 80,
  }),

  computed: {
    computedLeft () {
      return this.$vuetify.application.left
    },

    computedRight () {
      return this.$vuetify.application.right
    },

    styles () {
      return {
        left: convertToUnit(this.computedLeft),
        right: convertToUnit(this.computedRight),
      }
    },
  },

  mounted () {
    this.lastScrollPosition = window.pageYOffset
    window.addEventListener('scroll', this.onScroll)
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    // Toggle if navigation is shown or hidden
    onScroll () {
      if (window.pageYOffset < 0) {
        return
      }
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < this.scrollOffset) {
        return
      }
      this.showHeader = window.pageYOffset < this.lastScrollPosition
      this.lastScrollPosition = window.pageYOffset
    },
  },
}
</script>

<style scoped lang="sass">
@import '~vuetify/src/styles/styles'

.top-bar
  position: fixed
  top: 92px
  z-index: 3
  margin-left: 0
  transform: translateY(0)
  transition: transform 300ms linear

@media #{map-get($display-breakpoints, 'md-and-up')}
  .top-bar
    top: 48px

@media #{map-get($display-breakpoints, 'sm-and-down')}
  .top-bar.is-hidden
      transform: translateY(-100%)
</style>
