<template>
  <div class="tw-cursor-pointer tw-select-none
    tw-flex
    tw-justify-center tw-items-center"
    :class="{ 'tw-w-10 tw-h-10' : size === 'small',
      'tw-w-12 tw-h-12' : size === 'medium',
      'tw-w-16 tw-h-16' : size === 'large',
      'hover:tw-text-yellow-500 active:tw-text-yellow-600': type,
      'iconbut': src }"
    @click="handleClick">

    <i v-if="type" class="material-icons"
      :class="{ 'tw-text-2xl' : size === 'small',
        'tw-text-4xl' : size === 'medium',
        'tw-text-6xl' : size === 'large' }">{{ type }}</i>

    <img v-if="src" :src="src"
      :class="{ 'tw-w-6 tw-h-6' : size === 'small',
        'tw-w-8 tw-h-8' : size === 'medium',
        'tw-w-10 tw-h-10' : size === 'large' }"/>
  </div>
</template>

<script>
export default {
  name: 'ig-iconbutton',
  props: {
    type: String,
    size: {
      type: String,
      default: 'medium'
    },
    src: String
  },
  data: () => {
    return {
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  },
  mounted() {
  },
  computed: {
  }
}
</script>

<style scoped>
.iconbut {
  -webkit-filter: drop-shadow(0px 0px 2px dimgray);
  filter: drop-shadow(0px 0px 2px dimgray);
}

.iconbut:hover {
  -webkit-filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0));
  filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0));
}

.iconbut:active {
  -webkit-filter: drop-shadow(0px 0px 1px black);
  filter: drop-shadow(0px 0px 1px black);
}

@media screen and (max-width: 800px) {

}
</style>
