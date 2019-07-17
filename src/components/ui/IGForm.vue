<template>
  <div class="form tw-flex tw-flex-col tw-m-1">
    <div v-if="isObjectId(value) || isPrimitive(value) || value === null"
      class="tw-flex tw-items-end tw-w-full">

      <div :class="{
          'tw-w-1/2': editable,
          'tw-w-3/4': !editable
        }">

        <ig-select v-if="schema.enum" :label="$t(name)"
          :disabled="editable"
          :values="schema.enum" :value="value" @input="handleInput"
          class="tw-mr-4"/>

        <ig-fileinput v-else-if="schema._meta && schema._meta.type === 'image'"
          :disabled="editable" :showThumbnail="schema._meta.showThumbnail"
          :value="value" @input="handleInput"
          :label="$t(name)"/>

        <ig-fileinput v-else-if="schema._meta && schema._meta.type === 'file'"
          :disabled="editable"
          :value="value" @input="handleInput"
          :label="$t(name)"/>

        <ig-datetime-picker
          v-else-if="schema._meta && schema._meta.type && schema._meta.type.match(/date|time/)"
          :disabled="editable"
          :value="value" @input="handleInput"
          :label="$t(name)"/>

        <ig-input v-else
          :readonly="isReadOnly"
          :disabled="editable"
          :value="value" @input="handleInput"
          :label="$t(name)"/>
      </div>

      <!-- Meta edition: editing the schema -->
      <ig-select v-if="editable" :label="$t('Type')"
        :values="jsonTypes" v-model="schema.type"
        class="tw-w-1/4"></ig-select>

      <div v-if="hasSettings && editable"
        class="tw-mb-1 tw-flex tw-items-centered">
        <ig-iconbutton type="settings" @click="handleSettingsDialog(schema)"></ig-iconbutton>
      </div>
    </div>

    <div v-if="value && !isPrimitive(value) && schema.properties &&
      schema._meta.type !== 'geopoint'"
      class="tw-flex tw-flex-col tw-w-full"
      v-for="(prop, index) in properties" :key="index">

      <div v-if="!isObjectId(value[prop]) && !isPrimitive(value[prop])"
        class="tw-flex tw-items-center">
        <div class="tw-mt-4 tw-mb-4 tw-font-bold"
          :class="{ 'tw-text-gray-400': editable }">
          {{ $t(prop) }}</div>

        <div v-if="hasSettings && editable"
          class="tw-mb-1 tw-flex tw-items-centered">
          <ig-iconbutton type="settings"
            @click="handleSettingsDialog(schema.properties[prop])"></ig-iconbutton>
        </div>
      </div>

      <ig-form :name="prop"
        :schema.sync="schema.properties[prop]"
        @update:schema="handleUpdateSchema(prop, $event)"
        class="tw-ml-4 tw-h-full tw-border tw-border-gray-100"
        v-model="value[prop]" :editable="editable">{{ value[prop] }}</ig-form>
    </div>

    <div v-if="schema._meta.type === 'geopoint'"
      class="tw-flex tw-flex-col tw-w-full">
      <ig-geo v-if="schema._meta.type === 'geopoint'"
        :disabled="editable" :marker="value" @update:marker="handleGeoloc"/>
    </div>

    <!-- Schema settings dialog -->
    <ig-form-settings ref="settings" v-model="settingsDialog"
      :name="name"
      :schema.sync="schemaOnEdit"></ig-form-settings>
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
    value: {},
    editable: {
      type: Boolean
    },
    schema: {
      type: Object
    }
  },
  watch: {
    'schema._meta.type': function(val) {
      this._schema._meta.type = val

      switch (val) {
        case 'enum':
          this._schema.enum = this._schema.enum || []
          break

        case 'image':
          this._schema._meta.imageType = 'image/*'
          break

        case 'file':
          this._schema._meta.fileType = '*/*'
          break

        case 'date':
          this._schema.format = 'date'
          break

        case 'time':
          this._schema.format = 'time'
          break

        case 'datetime':
          this._schema.format = 'datetime'
          break

        default:

      }

      this.$emit('update:schema', this._schema)
    },
    'schema.enum': function(val) {
      this.$refs.settings.$forceUpdate()
    }
  },
  data: () => {
    return {
      jsonTypes: [
        {
          value: 'boolean',
          text: 'Boolean'
        },
        {
          value: 'string',
          text: 'String'
        },
        {
          value: 'number',
          text: 'Number'
        },
        {
          value: 'integer',
          text: 'Integer'
        },
        {
          value: 'null',
          text: 'Null'
        },
        {
          value: 'objectid',
          text: 'ObjectID'
        }
      ],
      hasSettings: false,
      settingsDialog: false,
      schemaOnEdit: null
    }
  },
  methods: {
    isObjectId(obj) {
      let isObjectId = obj ? obj._bsontype === 'ObjectID' : false

      if (isObjectId && (this.value === obj)) {
        this.handleType('objectid')
      }

      return isObjectId
    },
    isPrimitive(obj) {
      return !(typeof obj === 'object') && !Array.isArray(obj)
    },
    handleType(val) {
      switch (val) {
        case 'objectid':
          this._schema.readOnly = true
          break

        default:
      }

      this.$emit('update:schema', this._schema)
    },
    updateSettings() {
      if (!this._schema._meta) return
      switch (this._schema._meta.type) {
        case 'null':
          this.hasSettings = false
          break
        case 'objectid':
          this.hasSettings = false
          break
        default:
          this.hasSettings = true
      }
    },
    handleSettingsDialog(schema) {
      this.schemaOnEdit = schema
      console.log($j(this.schemaOnEdit))
      this.settingsDialog = true
    },
    handleInput(val) {
      this.$emit('input', val)
    },
    handleGeoloc(val) {
      console.log('GEOLOC', val)
      if (this._schema.type === 'object') {
        this.$emit('input', {
          latitude: val[1],
          longitude: val[0]
        })
      } else {
        this.$emit('input', val)
      }
    },
    handleUpdateSchema(prop, val) {
      this._schema.properties[prop] = val
      this.$emit('update:schema', this._schema)
    }
  },
  beforeMount() {
    this._schema = _.cloneDeep(this.schema)
    this._schema._meta = this._schema._meta || { type: null }
    this.$emit('update:schema', this._schema)
  },
  mounted() {
    this.updateSettings()

    // future use: sets root component for all
    if (this.$parent) {
      if (this.$parent.$options._componentTag === 'ig-form') {
        this._formRootElement = this.$parent._formRootElement
      } else {
        this._formRootElement = this.$parent.$el
      }
    }
  },
  computed: {
    properties() {
      if (this.value && (typeof this.value === 'object' || Array.isArray(this.value))) {
        return Object.keys(this.value)
      }

      return []
    },
    isReadOnly() {
      return !!this.schema.readOnly
    }
  }
}
</script>

<style scoped>
.form {

}

.enums {
  height: calc(100% - 0px);
}

@media screen and (max-width: 800px) {

}
</style>
