<template>
  <div class="pill-container d-flex">
    <v-divider class="mt-3" />
    <div class="text-p1 neutral--text text--darken-2 date-pill text-center">
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
  border: 1px solid var(--v-neutral-lighten1);
  border-radius: 15px;
  padding: 0 15px;
  height: 25px;
  line-height: 25px;
}
.theme--light.v-divider {
  border-color: var(--v-neutral-lighten1);
  box-shadow: 0 1px 0 #ffffff;
}
</style>
