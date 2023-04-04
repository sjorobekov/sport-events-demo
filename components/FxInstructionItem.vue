<template>
  <v-list dense class="my-0">
    <v-list-item class="my-0 pl-0 pl-lg-2">
      <v-list-item-avatar class="my-0" height="24" min-width="24" width="24">
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

    <v-list-item class="my-0 pl-0 pl-lg-2 helper-list-item ">
      <v-list-item-avatar class="py-1 my-0" height="17" min-width="24" width="24" />
      <v-list-item-content class="py-1 text-p1 neutral--text text--darken-3">
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
  color: var(--v-neutral-darken4)!important;
  font-weight: 600;
}
.v-list--dense .v-list-item {
  min-height: 15px;
}

.instruction-number {
  font-size: 16px;
}
</style>
