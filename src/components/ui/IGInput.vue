<template>
  <div class="input-layout
    tw-flex tw-flex-col tw-m-2 "
    :class="{
      'tw-bg-gray-200 hover:tw-bg-gray-200': readonly && !disabled,
      'hover:tw-bg-gray-100': !readonly && !disabled
    }">
    <label v-if="label"
      class="tw-text-xs tw-select-none"
      :class="{
        'tw-text-gray-400': disabled,
        'tw-text-yellow-600': !disabled
      }">{{ label }}</label>

    <input :readonly="readonly" :disabled="disabled"
      class="tw-outline-none t-h-8 tw-bg-transparent
        tw-border-b tw-text-gray-700"
      :class="{
        'tw-border-yellow-300': !disabled,
        'tw-border-gray-300': disabled,
        'hover:tw-text-yellow-700 focus:tw-border focus:tw-border-yellow-600': !readonly && !disabled,
        'tw-text-gray-300': disabled
      }"
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
