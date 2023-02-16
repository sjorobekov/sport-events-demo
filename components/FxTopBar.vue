<template>
  <div class="top-bar" :class="{ 'is-hidden': !showHeader }">
    <slot name="default" />
  </div>
</template>

<script>
export default {
  name: 'FxTopBar',

  data: () => ({
    showHeader: true,
    lastScrollPosition: 0,
    scrollOffset: 80,
  }),

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
  width: 100vw
  left: 0

@media #{map-get($display-breakpoints, 'md-and-up')}
  .top-bar
    top: 55px
    width: calc(100vw - 240px)
    left: 240px

@media #{map-get($display-breakpoints, 'sm-and-down')}
  .top-bar.is-hidden
      transform: translateY(-100%)
</style>
