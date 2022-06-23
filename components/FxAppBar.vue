<template>
  <v-app-bar height="56" app fixed elevation="1" color="white">
    <v-container>
      <v-row align="center">
        <v-spacer />

        <v-btn icon class="mr-2">
          <v-icon size="32" color="secondary">
            $vuetify.icons.bell
          </v-icon>
        </v-btn>

        <v-menu
          left
          bottom
        >
          <template #activator="{ on, attrs }">
            <v-avatar
              color="primary"
              size="32"
              v-bind="attrs"
              v-on="on"
            >
              <v-img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              />
            </v-avatar>
          </template>

          <v-list>
            <v-list-item
              v-for="n in 5"
              :key="n"
              @click="() => {}"
            >
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
}
</script>
