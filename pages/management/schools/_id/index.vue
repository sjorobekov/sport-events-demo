<template>
  <v-card>
    <v-card-title>
      School Information
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-list>
              <v-list-item>
                <v-list-item-content class="text--disabled">
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <SchoolInfoForm ref="form1" v-model="formData" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-title>
      Fixturr Portal
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-list>
              <v-list-item>
                <v-list-item-content class="text--disabled">
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <SchoolPortalForm ref="form2" v-model="formData" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn depressed color="brand2" dark class="ml-2" @click="save">
        <v-icon>$vuetify.icons.save</v-icon>Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import SchoolInfoForm from '~/components/admin/SchoolInfoForm'
import SchoolPortalForm from '~/components/admin/SchoolPortalForm'

export default {
  components: {
    SchoolInfoForm,
    SchoolPortalForm,
  },
  data: () => ({
    formData: {},
  }),
}
</script>
