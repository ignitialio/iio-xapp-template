<template>
  <div class="list-layout tw-flex tw-w-full">
    <ig-list class="tw-w-1/4 tw-m-1 tw-shadow t-h-full">
      <ig-listitem v-for="(item, index) in items" :key="index"
        :item="item" @select="handleSelect"
        :title="'' + (item.name || item.title || item.description)"
        :subtitle="item._id + ''">
      </ig-listitem>
    </ig-list>

    <div class="list-json-viewer tw-w-3/4 tw-p-1 tw-overflow-auto">
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import jsonPretty from 'json-pretty-html'

export default {
  data: () => {
    return {
      selected: null,
      items: null,
      jsonHTML: null
    }
  },
  methods: {
    handleSelect(item) {
      this.selected = item
      this.jsonHTML = jsonPretty(item)
      d3.select(this.$el).select('.list-json-viewer').html(this.jsonHTML)
      console.log($j(this.jsonHTML))
    }
  },
  mounted() {
    console.log(this.$router.currentRoute)
    this.collection = this.$router.currentRoute.query.collection
    console.log('LIST', this.collection)

    if (this.collection) {
      this.$db.collection(this.collection).then(items => {
        items.dFind({}).then(result => {
          console.log('items', result.length)
          this.items = result
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
    }
  },
  beforeDestroy() {
  }
}
</script>

<style>
.list-layout {
  height: calc(100% - 0px);
}

.list-json-viewer {
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

.list-json-viewer .json-key {
  color: dodgerblue;
  font-weight: bold;
}

.list-json-viewer .json-pretty {
    padding-left: 30px;
    padding-right: 30px;
}

.list-json-viewer .json-selected {
  background-color: rgba(139, 191, 228, 0.19999999999999996);
}

.list-json-viewer .json-string {
  color: #6caedd;
}

.list-json-viewer .json-key {
  color: #ec5f67;
}

.list-json-viewer .json-boolean {
    color: #99c794;
}

.list-json-viewer .json-number {
    color: #99c794;
}

</style>
