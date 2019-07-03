<template>
  <div class="input-layout
    tw-flex tw-flex-col tw-m-2 hover:tw-bg-gray-100"
    :class="{ 'tw-bg-gray-200 hover:tw-bg-gray-200': readonly }">
    <label v-if="label" class="tw-text-xs tw-select-none
      tw-text-yellow-600">{{ label }}</label>

    <input :readonly="readonly" :disabled="disabled"
      class="tw-outline-none t-h-8 tw-bg-transparent
        tw-border-b tw-border-yellow-300
        tw-text-gray-700"
      :class="{ 'hover:tw-text-yellow-700 focus:tw-border focus:tw-border-yellow-600': !readonly }"
      :value="value" @input="handleInput"
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
    },
    readonly: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  },
  data: () => {
    return {
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value)
    }
  },
  mounted() {

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
