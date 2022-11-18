<template>
  <v-card class="fx-card-border-top-sm-primary mb-3">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
          class="hidden-xs-only"
        >
          <FxInstructionItem>
            <template #number>
              1
            </template>
            <template #title>
              Subject and Message
            </template>
            <template #content>
              Enter subject and message of this announcement
            </template>
          </FxInstructionItem>
        </v-col>
        <v-col
          cols="24"
          md="6"
          lg="7"
          class="pt-8"
        >
          <v-row>
            <v-col>
              <slot name="default" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'FxAnnouncementFormCard',
}
</script>
