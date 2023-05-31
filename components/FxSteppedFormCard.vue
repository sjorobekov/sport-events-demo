<template>
  <v-card class="fx-card-border-top-primary mb-5">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          lg="5"
        >
          <FxInstructionItem>
            <template #number>
              <slot name="number" />
            </template>
            <template #title>
              <slot name="title" />
            </template>
            <template #content>
              <slot name="content" />
            </template>
          </FxInstructionItem>
        </v-col>

        <v-col
          cols="12"
          lg="7"
          class="py-4"
        >
          <slot name="default" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'FxSteppedFormCard',
}
</script>
