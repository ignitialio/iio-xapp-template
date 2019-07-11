<template>
  <div class="geo-layout">
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326" style="height: 400px">
      <vl-view :zoom="zoom" :center="center" :rotation="rotation"></vl-view>

      <vl-geoloc @update:position="geolocPosition = $event">
        <template slot-scope="geoloc">
          <vl-feature v-if="geoloc.position" id="position-feature">
            <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="assets/markers/marker.png"
                :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
    </vl-map>
  </div>
</template>

<script>
import Vue from 'vue'
import VueLayers from 'vuelayers'

import 'vuelayers/lib/style.css' // needs css-loader

Vue.use(VueLayers, {
  dataProjection: 'EPSG:4326',
})

export default {
  name: 'ig-geo',
  props: {
    marker: {},
    zoom: {
      type: Number,
      default: 8
    },
    rotation: {
      type: Number,
      default: 0
    },
    center: {
      type: Array,
      default: [ 9.689404, 39.987910 ]
    }
  },
  data() {
    return {
      geolocPosition: null
    }
  },
  mounted() {
    console.log($j(this.marker))
    this.geolocPosition = {
      position: Object.values(this.marker)
    }
  }
}
</script>

<style scoped>
.geo-layout {

}

@media screen and (max-width: 800px) {

}
</style>
