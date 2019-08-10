<template>
  <div class="item-layout tw-flex tw-w-full">
    <ig-form v-if="schema"
      v-model="item" :schema.sync="schema"
      :editable="editMode">
    </ig-form>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data: () => {
    return {
      editMode: null,
      item: null,
      schema: null,
      itemModified: false
    }
  },
  watch: {
    item: {
      handler: function(val) {
        this.itemModified = true
      },
      deep: true
    }
  },
  methods: {
    update() {
      if (this.collection) {
        this.$db.collection(this.collection).then(items => {
          items.dFind(this.item).then(result => {
            console.log(result)
          }).catch(err => console.log(err))
        }).catch(err => console.log(err))
      }
    },
    handleEditMode(val) {
      this.editMode = val
    },
    handleSaveItem() {
      this.$db.collection(this.collection).then(async items => {
        try {
          if (this.item._id) {
            await items.dUpdate({ _id: this.item._id }, this.item)
          } else {
            this.item = await items.dPut(this.item)
          }

          this.itemModified = false
        } catch (err) {
          console.log(err)
        }
      }).catch(err => console.log(err))
    }
  },
  mounted() {
    this._listeners = {
      onEditMode: this.handleEditMode.bind(this)
    }

    console.log(this.$router.currentRoute)
    this.collection = this.$router.currentRoute.query.collection
    this.item = JSON.parse(this.$router.currentRoute.query.data)
    this.schema = JSON.parse(this.$router.currentRoute.query.schema)
    console.log('ITEM', $j(this.schema), this.collection)

    this.$services.emit('app:context:bar', 'item-ctx')

    this.$services.on('view:users:edit', this._listeners.onEditMode)
  },
  beforeDestroy() {
    this.$services.emit('app:context:bar', null)

    this.$services.off('view:users:edit', this._listeners.onEditMode)
  }
}
</script>

<style>
.item-layout {
  height: calc(100% - 0px);
}

.item-json-viewer {
  height: calc(100% - 0px);

  font-family: Menlo, Monaco, "Courier New", monospace;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0;
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0;
}

.item-json-viewer .json-key {
  color: dodgerblue;
  font-weight: bold;
}

.item-json-viewer .json-pretty {
    padding-left: 30px;
    padding-right: 30px;
}

.item-json-viewer .json-selected {
  background-color: rgba(139, 191, 228, 0.19999999999999996);
}

.item-json-viewer .json-string {
  color: #6caedd;
}

.item-json-viewer .json-key {
  color: #ec5f67;
}

.item-json-viewer .json-boolean {
    color: #99c794;
}

.item-json-viewer .json-number {
    color: #99c794;
}

</style>
