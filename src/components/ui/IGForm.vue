<template>
  <div class="form tw-flex tw-flex-col tw-m-1">
    <div v-if="isObjectId(data) || isPrimitive(data) || data === null"
      class="tw-flex tw-items-end tw-w-full">
      <ig-input class="tw-w-1/2"
        v-model="data" :label="$t(name)"/>
      <ig-select v-if="editable" :label="$t('Type')"
        :values="itemTypes" :value="selectedType"
        @input="handleType"
        class="tw-w-1/4"></ig-select>
    </div>

    <div v-if="data && !isPrimitive(data) && schema.properties"
      class="tw-flex tw-flex-col tw-w-full"
      v-for="(prop, index) in properties" :key="index">
      <div v-if="!isObjectId(data[prop]) && !isPrimitive(data[prop])"
        class="tw-mt-4 tw-mb-4 tw-font-bold">
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
import bson from 'bson'

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
        },
        {
          value: 'objectid',
          text: 'ObjectID'
        }
      ]
    }
  },
  methods: {
    isObjectId(obj) {
      let isObjectId = obj ? obj._bsontype === 'ObjectID' : false

      if (isObjectId && (this.data === obj)) {
        this.handleType('objectid')
      }

      return isObjectId
    },
    isPrimitive(obj) {
      return !(typeof obj === 'object') && !Array.isArray(obj)
    },
    async handleType(val) {
      try {
        await this.$utils.waitForProperty(this, '_schema')
        this._schema._meta = this._schema._meta || { type: null }
        this._schema._meta.type = val
        this.$emit('update:schema', this._schema)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this._schema = _.cloneDeep(this.schema)
    // console.log($j(this.schema))
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
