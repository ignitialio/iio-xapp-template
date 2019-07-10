<template>
  <div class="form tw-flex tw-flex-col tw-m-1">
    <div v-if="isObjectId(value) || isPrimitive(value) || value === null"
      class="tw-flex tw-items-end tw-w-full">

      <div :class="{
          'tw-w-1/2': editable,
          'tw-w-3/4': !editable
        }">
        <ig-select v-if="schema.enum" :label="$t(name)"
          :values="schema.enum" :value="value" @input="handleInput"
          class="tw-mr-4"></ig-select>

        <ig-fileinput v-else-if="schema._meta && schema._meta.type === 'image'"
          :value="value" @input="handleInput"
          :label="$t(name)"/>

        <ig-fileinput v-else-if="schema._meta && schema._meta.type === 'file'"
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
        <ig-iconbutton type="settings" @click="handleSettingsDialog"></ig-iconbutton>
      </div>
    </div>

    <div v-if="value && !isPrimitive(value) && schema.properties"
      class="tw-flex tw-flex-col tw-w-full"
      v-for="(prop, index) in properties" :key="index">
      <div v-if="!isObjectId(value[prop]) && !isPrimitive(value[prop])"
        class="tw-mt-4 tw-mb-4 tw-font-bold"
        :class="{ 'tw-text-gray-400': editable }">
        {{ $t(prop) }}</div>

      <ig-form :name="prop"
        :schema.sync="schema.properties[prop]"
        class="tw-ml-4 tw-h-full tw-border tw-border-gray-100"
        v-model="value[prop]" :editable="editable">{{ value[prop] }}</ig-form>
    </div>

    <!-- Schema settings dialog -->
    <ig-dialog v-model="settingsDialog"
      :title="$t('Property detailed type')"
      :subtitle="name"
      width="60%" height="60%">
      <ig-vbox verticalFill>
        <ig-hbox class="dialog-content">
          <ig-vbox class="settings-left tw-w-1/4">
            <ig-select v-if="schema._meta" :label="$t('Type')"
              :values="strTypes" v-model="schema._meta.type"></ig-select>
            {{ schema }}
          </ig-vbox>

          <ig-vbox class="settings-right tw-w-3/4 tw-p-1">
            <div class="tw-flex tw-flex-col"
              v-if="schema.enum && schema._meta.type === 'enum'">
              <div class="tw-flex tw-items-center"
                v-for="item in schema.enum">
                <ig-input v-model="item.value" :label="$t('Value')"></ig-input>
                <ig-input v-model="item.text" :label="$t('Text')"></ig-input>
                <ig-iconbutton type="clear" color="red"
                  @click="handleRemoveEnumItem"></ig-iconbutton>
              </div>
              <ig-iconbutton type="add" color="green"
                @click="handleAddEnumItem"></ig-iconbutton>
            </div>

            <div class="tw-flex tw-flex-col"
              v-else-if="schema._meta.type === 'file'">
              <ig-input v-model="schema._meta.maxSize" type="number"
                :label="$t('Max size')"></ig-input>

              <ig-input v-model="schema._meta.fileType"
                :label="$t('File type')"></ig-input>
            </div>

            <div class="tw-flex tw-flex-col"
              v-else-if="schema._meta.type === 'image'">
              <ig-input v-model="schema._meta.maxSize" type="number"
                :label="$t('Max size')"></ig-input>

              <ig-select v-if="schema._meta" :label="$t('Image type')"
                :values="imageTypes" v-model="schema._meta.imageType"></ig-select>
            </div>
          </ig-vbox>
        </ig-hbox>

        <ig-hbox class="tw-h-16 tw-justify-end tw-items-center">
          <ig-iconbutton type="check" color="green" @click="handleCloseSettings">
          </ig-iconbutton>
        </ig-hbox>
      </ig-vbox>
    </ig-dialog>
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

        default:

      }

      this.$emit('update:schema', this._schema)
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
      strTypes: [
        {
          value: 'enum',
          text: 'Enum'
        },
        {
          value: 'file',
          text: 'File'
        },
        {
          value: 'image',
          text: 'Image'
        }
      ],
      imageTypes: [
        {
          value: 'image/jpeg',
          text: 'JPEG'
        },
        {
          value: 'image/png',
          text: 'PNG'
        },
        {
          value: 'image/webp',
          text: 'WebP'
        },
        {
          value: 'image/svg+xml',
          text: 'SVG'
        },
        {
          value: 'image/*',
          text: 'All'
        }
      ],
      hasSettings: false,
      settingsDialog: false
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
    handleSettingsDialog() {
      this.settingsDialog = true
    },
    handleCloseSettings() {
      this.settingsDialog = false
    },
    handleAddEnumItem() {
      this._schema.enum.push({
        text: '',
        value: null
      })

      this.$emit('update:schema', this._schema)
    },
    handleRemoveEnumItem(item) {
      let index = this._schema.enum.indexOf(item)
      this._schema.enum.splice(index, 1)

      this.$emit('update:schema', this._schema)
    },
    handleInput(val) {
      this.$emit('input', val)
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

.dialog-content {
  flex: 1;
}

@media screen and (max-width: 800px) {

}
</style>
