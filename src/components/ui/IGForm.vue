<template>
  <div class="form tw-flex tw-flex-col tw-m-1">
    <div v-if="isPrimitive(data)"
      class="tw-flex tw-items-end tw-w-full">
      <ig-input class="tw-w-1/2"
        v-model="data" :label="$t(name)"/>
      <ig-select v-if="editable" :label="$t('Type')"
        :values="itemTypes" :value="selectedType"
        @input="handleType"
        class="tw-w-1/4"></ig-select>
    </div>

    <div v-if="!isPrimitive(data)" class="tw-flex tw-flex-col tw-w-full"
      v-for="(prop, index) in properties" :key="index">
      <div v-if="!isPrimitive(data[prop])" class="tw-mt-4 tw-mb-4 tw-font-bold">
        {{ $t(prop) }}</div>

      <ig-form :name="prop"
        :schema.sync="schema.properties[prop]"
        class="tw-ml-4 tw-h-full tw-border tw-border-gray-100"
        :data="data[prop]" :editable="editable">{{ data[prop] }}</ig-form>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'ig-form',
  props: {
    name: {
      type: String
    },
    data: {},
    editable: {
      type: Boolean
    },
    schema: {
      type: Object
    }
  },
  data: () => {
    return {
      itemTypes: [
        {
          value: 'string',
          text: 'String'
        },
        {
          value: 'number',
          text: 'Number'
        },
        {
          value: 'image',
          text: 'Image'
        }
      ]
    }
  },
  methods: {
    isPrimitive(obj) {
      return !(typeof obj === 'object') && !Array.isArray(obj)
    },
    handleType(val) {
      this._schema._meta = this._schema._meta || { type: null }
      this._schema._meta.type = val
      this.$emit('update:schema', this._schema)
    }
  },
  mounted() {
    this._schema = _.cloneDeep(this.schema)
  },
  computed: {
    selectedType() {
      return this.schema._meta ? this.schema._meta.type : null
    },
    properties() {
      if (this.data && (typeof this.data === 'object' || Array.isArray(this.data))) {
        return Object.keys(this.data)
      }

      return []
    }
  }
}
</script>

<style scoped>
.form {

}

@media screen and (max-width: 800px) {

}
</style>
