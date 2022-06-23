<template>
  <div>
    <v-row>
      <v-col cols="3">
        <div class="text-center text-p1 info--text text--darken-1">
          Played
        </div>
        <div class="text-center text-p3 info--text text--darken-3">
          {{ totalGames }}
        </div>
      </v-col>
      <v-col cols="3">
        <div class="text-center text-p1 info--text text--darken-1">
          Won
        </div>
        <div class="text-center text-p3 info--text text--darken-3">
          {{ won }}
        </div>
      </v-col>
      <v-col cols="3">
        <div class="text-center text-p1 info--text text--darken-1">
          Drawn
        </div>
        <div class="text-center text-p3 info--text text--darken-3">
          {{ drawn }}
        </div>
      </v-col>
      <v-col cols="3">
        <div class="text-center text-p1 info--text text--darken-1">
          Lost
        </div>
        <div class="text-center text-p3 info--text text--darken-3">
          {{ lost }}
        </div>
      </v-col>
    </v-row>

    <div class="bar-container mt-3">
      <div class="d-inline-block bar won-bar" :style="`width: ${percentage.won}%!important`" />
      <div class="d-inline-block bar drawn-bar" :style="`width: ${percentage.drawn}%!important`" />
      <div class="d-inline-block bar lost-bar" :style="`width: ${percentage.lost}%!important`" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FxWonRateBar',
  props: {
    won: {
      type: Number,
      default: 0,
    },
    drawn: {
      type: Number,
      default: 0,
    },
    lost: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    totalGames () {
      return this.won + this.drawn + this.lost
    },
    percentage () {
      const total = this.totalGames
      const percentage = { }
      percentage.won = Math.round(this.won / total * 100)
      percentage.lost = Math.round(this.lost / total * 100)
      percentage.drawn = 100 - percentage.won - percentage.lost
      return percentage
    },
  },
}
</script>

<style lang="sass" scoped>
.bar-container
  clear: both
  overflow: hidden
  padding: 0
  border-radius: 5px
  height: 16px
.bar
  height: 100%
  position: relative
  font-size: 0
  line-height: 0
  float: left
  clear: none
.won-bar
  background: var(--v-success-base)
.drawn-bar
  background: var(--v-info-lighten2)
.lost-bar
  background: var(--v-error-base)
</style>
