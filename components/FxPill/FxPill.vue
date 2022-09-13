<template>
  <div class="pill-container d-flex">
    <v-divider class="mt-3" />
    <div class="text-p1 info--text text--darken-1 date-pill text-center">
      <slot name="default" />
    </div>
    <v-divider class="mt-3" />
  </div>
</template>

<script>
export default {
  name: 'FxPill',
}
</script>

<style scoped>
.date-pill {
  background: #FFFFFF;
  border: 1px solid var(--v-info-lighten2);
  border-radius: 15px;
  padding: 0 15px;
  height: 25px;
  line-height: 25px;
}
</style>
