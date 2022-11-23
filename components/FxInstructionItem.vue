<template>
  <v-list dense class="my-0">
    <v-list-item class="my-0">
      <v-list-item-avatar class="my-0" height="32" min-width="32" width="32">
        <v-avatar color="primary">
          <span class="white--text text-h5">
            <slot name="number" />
          </span>
        </v-avatar>
      </v-list-item-avatar>

      <v-list-item-content class="py-0">
        <v-list-item-title class="list-item-numbered-title">
          <slot name="title" />
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item class="my-0 helper-list-item">
      <v-list-item-avatar class="py-0 my-0" height="17" min-width="32" width="32" />
      <v-list-item-content class="py-0 text-p1 info--text text--darken-1">
        <slot name="content" />
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
.v-list--dense .v-list-item {
  min-height: 15px;
}
</style>
