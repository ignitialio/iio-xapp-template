<template>
  <div class="input-layout tw-flex tw-m-2"
    :class="{
      'tw-bg-gray-200 hover:tw-bg-gray-200': readonly && !disabled,
      'hover:tw-bg-gray-100': !readonly && !disabled
    }">

    <ig-iconbutton class="trigger"
      :disabled="disabled" type="attach_file"></ig-iconbutton>

    <div class="drop-target tw-flex tw-flex-col">
      <label v-if="label"
        class="input-label tw-top-0 tw-left-0 tw-text-xs tw-select-none"
        :class="{
          'tw-text-gray-400': disabled,
          'tw-text-yellow-600': !disabled
        }">{{ label }}</label>

      <input readonly :disabled="disabled"
        class="tw-outline-none t-h-8 tw-bg-transparent
          tw-border-b tw-text-gray-700"
        :class="{
          'tw-border-yellow-300': !disabled,
          'tw-border-gray-300': disabled,
          'hover:tw-text-yellow-700 focus:tw-border focus:tw-border-yellow-600': !readonly && !disabled,
          'tw-text-gray-300': disabled,
          'input-pwd': type === 'password'
        }"
        :value="value"
        type="text"/>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import Flow from '@flowjs/flow.js'

export default {
  name: 'ig-fileinput',
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
      showPassword: false
    }
  },
  methods: {
    handleFileSelection(event) {
      console.log(event)
      this.$emit('input', event.target.value)
    }
  },
  mounted() {
    var flow = new Flow({
      target: '/api/upload',
        query: {
          token: localStorage.getItem('token')
        }
      })

    flow.assignBrowse(d3.select(this.$el).select('.trigger').node())
    flow.assignDrop(d3.select(this.$el).select('.drop-target').node())

    flow.on('fileAdded', (file, event) => {
      console.log(file, event)
      this.$emit('input', file.name)
    })

    flow.on('fileSuccess', (file, message) => {
      console.log(file, message)
    })

    flow.on('fileError', (file, message) => {
      console.log(file, message)
    })

    flow.on('error', (file, message) => {
      console.log(file, message)
    })
  },
  computed: {
  }
}
</script>

<style scoped>
.input-pwd {
  width: 177px;
}

@media screen and (max-width: 800px) {

}
</style>
