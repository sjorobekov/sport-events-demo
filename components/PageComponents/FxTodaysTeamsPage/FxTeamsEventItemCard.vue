<template>
  <v-card class="mt-4">
    <v-row no-gutters>
      <v-col cols="12" md="6" class="border-right">
        <v-list-item class="event-item-card-heading border-bottom">
          <v-list-item-content>
            <v-list-item-title class="text-subheading font-weight-bold">
              <slot name="title" />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <slot name="default" />
      </v-col>
      <v-col>
        <slot name="list" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'FxTeamsEventItemCard',
}
</script>

<style scoped>
.event-item-card-heading {
  border-left: var(--v-primary-base) 8px solid;
  height: 77px;
  border-radius: 4px;
}
</style>
