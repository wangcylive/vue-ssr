<template>
    <div id="app">访问的地址是：{{ url }} <span v-for="item of city" :key="item" @click="onClick(item)">{{item}}</span></div>
</template>

<script>
export default {
  name: 'AppVue',
  data () {
    return window._VUE_STATA
  },
  methods: {
    onClick (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss">

</style>