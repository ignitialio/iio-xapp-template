<template>
  <div class="form tw-flex tw-flex-col tw-m-1">
    <div v-if="isObjectId(data) || isPrimitive(data) || data === null"
      class="tw-flex tw-items-end tw-w-full">

      <ig-select v-if="schema.enum" :label="$t(name)"
        :values="schema.enum" v-model="data"
        class="tw-w-1/2 tw-mr-4"></ig-select>

      <div v-else-if="schema._meta.type === 'image'"
        class="tw-w-1/2 tw-flex tw-items-center tw-mr-4">
        <ig-iconbutton type="photo_size_select_actual"></ig-iconbutton>
        <ig-input class="tw-flex-1" readonly v-model="data" :label="$t(name)"/>
      </div>

      <ig-input v-else
        class="tw-w-1/2"
        :readonly="isReadOnly"
        :disabled="editable"
        v-model="data" :label="$t(name)"/>

      <!-- Meta edition: editing the schema -->
      <ig-select v-if="editable" :label="$t('Type')"
        :values="jsonTypes" v-model="schema.type"
        class="tw-w-1/4"></ig-select>

      <div v-if="hasSettings && editable" class="tw-mb-1 tw-flex tw-items-centered">
        <ig-iconbutton type="settings" @click="handleSettingsDialog"></ig-iconbutton>
      </div>
    </div>

    <div v-if="data && !isPrimitive(data) && schema.properties"
      class="tw-flex tw-flex-col tw-w-full"
      v-for="(prop, index) in properties" :key="index">
      <div v-if="!isObjectId(data[prop]) && !isPrimitive(data[prop])"
        class="tw-mt-4 tw-mb-4 tw-font-bold"
        :class="{ 'tw-text-gray-400': editable }">
        {{ $t(prop) }}</div>

      <ig-form :name="prop"
        :schema.sync="schema.properties[prop]"
        class="tw-ml-4 tw-h-full tw-border tw-border-gray-100"
        :data="data[prop]" :editable="editable">{{ data[prop] }}</ig-form>
    </div>

    <ig-dialog v-model="settingsDialog"
      :title="$t('Property detailed type')"
      :subtitle="name"
      width="60%" height="60%">
      <ig-vbox verticalFill>
        <ig-hbox class="settings-content">
          <ig-vbox class="settings-left tw-w-1/4">
            <ig-select v-if="schema._meta" :label="$t('Type')"
              :values="strTypes" v-model="schema._meta.type"></ig-select>
          </ig-vbox>

          <ig-vbox class="settings-right tw-w-3/4 tw-p-1">
            <div class="tw-flex tw-flex-col" v-if="schema.enum">
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
    data: {},
    editable: {
      type: Boolean
    },
    schema: {
      type: Object
    }
  },
  watch: {
    'schema._meta._type': function(val) {
      switch (val) {
        case 'enum':
          this._schema.enum = []
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
      hasSettings: false,
      settingsDialog: false
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

        switch (val) {
          case 'objectid':
            this._schema.readOnly = true
            break

          case 'enum':
            this._schema.enum = this._schema.enum || []
            break

          default:
        }

        this.$emit('update:schema', this._schema)
      } catch (err) {
        console.log(err)
      }
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
    }
  },
  mounted() {
    this._schema = _.cloneDeep(this.schema)
    this._schema._meta = this._schema._meta || { type: null }
    this.$emit('update:schema', this._schema)

    this.updateSettings()
    // console.log($j(this.schema))

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
      if (this.data && (typeof this.data === 'object' || Array.isArray(this.data))) {
        return Object.keys(this.data)
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

.settings-content {
  flex: 1;
}

@media screen and (max-width: 800px) {

}
</style>
