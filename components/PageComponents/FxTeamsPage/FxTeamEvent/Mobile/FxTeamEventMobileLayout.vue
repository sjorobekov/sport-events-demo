<template>
  <v-container class="rounded">
    <v-row>
      <v-col cols="12" class="border-bottom pt-1 pb-0">
        <slot name="date" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list class="py-1">
          <slot name="default" />
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FxTeamEventMobileLayout',
}
</script>
