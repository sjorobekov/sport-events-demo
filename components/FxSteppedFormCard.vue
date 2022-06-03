<template>
  <v-card class="fx-card-border-top-primary mb-3">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="5"
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
          md="7"
          lg="7"
          class="pt-8"
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
