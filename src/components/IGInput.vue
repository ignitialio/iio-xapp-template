<template>
  <div class="input-layout
    tw-flex tw-flex-col tw-m-2 hover:tw-bg-gray-100">
    <label v-if="label" class="tw-text-xs tw-select-none
      tw-text-yellow-600">{{ label }}</label>
    <input class="tw-outline-none t-h-8 tw-bg-transparent
        tw-border-b tw-border-yellow-300
        tw-text-gray-700 hover:tw-text-yellow-700
        focus:tw-border focus:tw-border-yellow-600"
        :value="i_value" @change="handleChange"
        :type="type"/>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'ig-input',
  props: {
    value: {},
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String
    }
  },
  data: () => {
    return {
      i_value: null
    }
  },
  watch: {
    value: function(val) {
      this.i_value = val
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('input', this.i_value)
    }
  },
  mounted() {
    this._i_value = _.cloneDeep(this.value)
  },
  computed: {
  }
}
</script>

<style scoped>
.input-layout {

}
@media screen and (max-width: 800px) {

}
</style>
