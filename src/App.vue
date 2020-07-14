<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
const defaultLayout = 'default'
export default {
  computed: {
    layout () {
      const finalLayout = this.$route.meta.layout ? this.$route.meta.layout : defaultLayout
      return finalLayout + '-layout'
    }
  },
  created () {
    var cssBrand = 'font-size: 20px; color:#d5333e; font-weight: bold;'
    var cssStop = 'font-size: 50px; color:#d5333e; font-weight: bold;'
    console.log('%c ✵ ✵ ✵ ✵ ✵ ✵ ✵ ✵ ✵ ✵', cssStop)
    console.log('%c         Desarrollado por %s', cssBrand, 'https://www.linkedin.com/in/olvisquintana/')
    console.log('%c ✵ ✵ ✵ ✵ ✵ ✵ ✵ ✵ ✵ ✵', cssStop)
  }
}
</script>
<style lang="scss">
  body.default {
    background: #ffffff;
  }
</style>
