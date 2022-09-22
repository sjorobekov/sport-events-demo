<template>
  <div>
    <v-avatar rounded size="40" class="mr-2" color="#F1F5F9">
      {{ home }}
    </v-avatar>
    <v-avatar rounded size="40" class="ml-2" color="#F1F5F9">
      {{ away }}
    </v-avatar>
  </div>
</template>

<script>
export default {
  name: 'HouseVsHouse',
  props: {
    home: {
      type: String,
      default: undefined,
    },
    away: {
      type: String,
      default: undefined,
    },
  },
}
</script>
