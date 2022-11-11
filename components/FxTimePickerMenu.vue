<template>
  <v-menu ref="menu" :close-on-content-click="false" min-width="auto" rounded="b-md">
    <template #activator="{ on, attrs }">
      <v-text-field
        :id="id"
        v-async-validate
        :value="value"
        v-bind="attrs"
        readonly
        outlined
        :placeholder="placeholder"
        dense
        :async-rules="asyncRules"
        append-icon="mdi-clock-outline"
        :hide-details="hideDetails"
        v-on="on"
      />
    </template>
    <FxTimePicker
      :value="value"
      @input="$emit('input', $event)"
    >
      <template #actions>
        <div class="mt-4">
          <v-btn block depressed color="primary" @click="$refs.menu.save()">
            Ok
          </v-btn>
        </div>
      </template>
    </FxTimePicker>
  </v-menu>
</template>

<script>
export default {
  name: 'FxTimePickerMenu',
  props: {
    value: {
      type: String,
      default: undefined,
    },
    id: {
      type: String,
      default: undefined,
    },
    asyncRules: {
      type: Array,
      default: () => [],
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'HH:MM',
    },
  },
}
</script>
