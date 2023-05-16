<template>
  <div>
    <div class="mx-7">
      <h1 class="text-h3 text-center branddark--text mt-6 mb-2">
        Invite Your Team
      </h1>
      <h2 class="text-p3 text-center branddark--text text--lighten-1 mb-6">
        Insert some text here about how it’s better with a team.
      </h2>
    </div>
    <div class="mx-4 mx-sm-auto sign-in-form">
      <v-form ref="form" v-async-form class="mx-sm-auto sign-in-form" :disabled="loading" @submit.prevent="submitHandler">
        <v-row>
          <v-col cols="7" class="pb-0 pr-1">
            <label class="caption">Email</label>
          </v-col>
          <v-col cols="5" class="pb-0 pl-1">
            <label class="caption">User Role</label>
          </v-col>
        </v-row>

        <v-row v-for="(item, i) in formData" :key="i">
          <v-col cols="7" class="pt-0 pr-1">
            <v-text-field
              v-model="item.email"
              v-async-validate
              outlined
              hide-details
              placeholder="name@school.com"
              :async-rules="[$rule.email]"
            />
          </v-col>
          <v-col cols="5" class="pt-0 pl-1">
            <v-select
              v-model="item.userRole"
              outlined
              hide-details
              required
              :items="roleItems"
              append-outer-icon="mdi-window-close"
              @click:append-outer="removeLine(i)"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn
              text
              color="neutral darken-3"
              height="54"
              class="mt-6 mb-6 dash"
              block
              @click="addMore"
            >
              Add More
            </v-btn>

            <v-btn
              type="submit"
              depressed
              color="brandgreen"
              dark
              height="50"
              :loading="loading"
              block
              class="sign-up-button"
            >
              Next
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-btn class="mt-3 mb-4" text color="neutral darken-3" block @click="addLater">
        Invite Team Later
      </v-btn>
    </div>
  </div>
</template>

<script>
import { UserRole } from '@/enum'

export default {
  name: 'InviteTeam',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    loading: false,
    formData: [],
  }),

  computed: {
    roleItems () {
      return [UserRole.ADMIN, UserRole.SPORTS_USER, UserRole.VIEW_ONLY].map((item) => {
        return {
          value: item,
          text: this.$t(`USER_ROLE.${item}`),
        }
      })
    },
  },

  created () {
    if (this.value.length) {
      this.formData = [...this.value]
    } else {
      this.formData = [
        { email: '', userRole: UserRole.ADMIN },
        { email: '', userRole: UserRole.SPORTS_USER },
      ]
    }
  },

  methods: {
    addMore () {
      this.formData.push({ email: '', userRole: UserRole.ADMIN })
    },

    async submitHandler () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.loading = false
        return
      }

      this.$emit('input', this.formData.filter(({ email }) => !!email))
      this.loading = false
    },

    addLater () {
      this.$emit('input', [])
    },

    removeLine (i) {
      this.formData.splice(i, 1)
    },
  },
}
</script>

<style scoped>
.v-btn.dash {
  border-style: dashed!important;
  border-width: 1px;
  border-color: var(--v-neutral-darken1);
}
</style>
