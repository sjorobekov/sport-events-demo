<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <FxSteppedFormCard>
      <template #number>
        1
      </template>
      <template #title>
        Name & Role
      </template>
      <template #content>
        Enter name & role
      </template>

      <label for="name">Sports Contact Name</label>
      <v-text-field
        id="name"
        v-async-validate
        :value="formData.name"
        :async-rules="[$rule.required]"
        dense
        outlined
        placeholder="Contact Name"
        @input="update('name', $event)"
      />
      <label for="role">Sports Contact Role</label>
      <v-text-field
        id="role"
        v-async-validate
        :value="formData.role"
        :async-rules="[$rule.required]"
        dense
        outlined
        placeholder="Contact Role"
        @input="update('role', $event)"
      />
    </FxSteppedFormCard>
    <FxSteppedFormCard>
      <template #number>
        2
      </template>
      <template #title>
        Contact Information
      </template>
      <template #content>
        Enter contact information
      </template>

      <label for="email">Email Address</label>
      <v-text-field
        id="email"
        v-async-validate
        :value="formData.email"
        :async-rules="[$rule.required]"
        dense
        outlined
        placeholder="Email Address"
        @input="update('email', $event)"
      />
      <label for="phone">Phone Number</label>
      <v-text-field
        id="phone"
        v-async-validate
        :value="formData.phone"
        :async-rules="[$rule.required, $rule.phone]"
        dense
        outlined
        placeholder="Phone Number"
        maxlength="15"
        @input="update('phone', $event)"
      />
    </FxSteppedFormCard>
    <FxSteppedFormCard>
      <template #number>
        3
      </template>
      <template #title>
        Main Sports Contact
      </template>

      <v-checkbox
        :input-value="formData.main"
        label="Display this contact as the Main Sports Contact"
        class="info--text"
        hide-details
        @change="update('main', $event)"
      />
    </FxSteppedFormCard>
    <FxSteppedFormCard>
      <template #number>
        4
      </template>
      <template #title>
        Sports Contact Photo (Optional)
      </template>

      <label>Upload Image</label>
      <v-file-input
        accept="image/*"
        outlined
        dense
        :prepend-icon="null"
        prepend-inner-icon="mdi-camera"
        @change="uploadHandler"
      />
      <v-img
        v-if="image"
        max-height="200"
        :src="image"
      />
    </FxSteppedFormCard>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import imageCompression from 'browser-image-compression'
export default {
  name: 'FxSportsContactForm',

  props: {
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    preview: null,
  }),

  computed: {
    formData () {
      return {
        main: false,
        ...(this.value || {}),
      }
    },
    compressionOptions: () => ({
      maxSizeMB: 2,
      maxWidthOrHeight: 4032,
      useWebWorker: true,
    }),
    image () {
      return this.preview || this.formData.avatar
    },
  },

  methods: {
    ...mapActions({
      readBlob: 'helper/readBlob',
    }),
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },
    uploadHandler (file) {
      imageCompression(file, this.compressionOptions)
        .then(async (compressedFile) => {
          this.update('file', compressedFile)
          this.preview = await this.readBlob(compressedFile)
        })
    },
  },
}
</script>
