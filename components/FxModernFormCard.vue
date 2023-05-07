<template>
  <v-card class="fx-card-border-top-primary mb-3">
    <v-container>
      <v-row class="px-0 px-md-6">
        <v-col
          cols="12"
          sm="5"
        >
          <v-list-item class="px-0">
            <v-list-item-icon class="mr-3">
              <slot name="icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="neutral--text text--darken-4 text-subheading font-weight-bold">
                <slot name="title" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <div class="text-p2 neutral--text text--darken-3 mt-1">
            <slot name="content" />
          </div>
        </v-col>

        <v-col
          cols="12"
          sm="7"
          class="pt-5"
        >
          <slot name="default" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'FxModernFormCard',
}
</script>
