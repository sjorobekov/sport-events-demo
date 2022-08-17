<script>
import { VListGroup } from 'vuetify/lib'

export default {
  name: 'FxListGroup',
  extends: VListGroup,
  props: {
    appendIcon: {
      type: String,
      default: undefined,
    },
    prependIcon: {
      type: String,
      default: 'mdi-chevron-right',
    },
  },
}
</script>

<style lang="sass">
.v-list-group--active > .v-list-group__header
  > .v-list-group__header__prepend-icon .v-icon
    transform: rotate(90deg)
</style>
