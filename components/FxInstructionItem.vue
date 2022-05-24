<template>
  <v-list class="my-0">
    <v-list-item class="my-0" three-line>
      <v-list-item-avatar class="my-0">
        <v-avatar color="brand">
          <span class="white--text text-h5">
            <slot name="number" />
          </span>
        </v-avatar>
      </v-list-item-avatar>

      <v-list-item-content class="py-0">
        <v-list-item-title class="list-item-numbered-title">
          <slot name="title" />
        </v-list-item-title>
        <v-list-item-subtitle class="text-p1 py-0 info--text text--darken-1">
          <slot name="content" />
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'FxInstructionItem',
}
</script>

<style lang="scss" scoped>
.list-item-numbered-title {
  font-size: rem(18px)!important;
  color: var(--v-info-darken3)!important;
  font-weight: 600;
}
</style>
