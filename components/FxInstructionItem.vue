<template>
  <v-list dense class="my-0">
    <v-list-item class="my-0">
      <v-list-item-avatar class="my-0" height="20" min-width="20" width="20">
        <v-avatar color="primary">
          <span class="white--text instruction-number">
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
      <v-list-item-avatar class="py-0 my-0" height="17" min-width="20" width="20" />
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

.instruction-number {
  font-size: 14px;
}
</style>
