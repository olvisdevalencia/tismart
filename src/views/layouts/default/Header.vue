<template>
  <div class="header-container">
    <div class="row">
      <div class="col-1 ml-2">
        <i class="el-icon-arrow-left back-btn" @click="goBack"></i>
      </div>
      <div class="col">
        <span class="title"> {{ title }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import '@/views/layouts/default/Header.scss'
import { mapGetters } from 'vuex'

export default {
  name: 'layouts.default.header',
  data: () => ({
    title: ''
  }),
  computed: {
    ...mapGetters({ appTitle: ['getTitle'] })
  },
  watch: {
    appTitle: function (appTitle) {
      this.title = appTitle
    }
  },
  methods: {
    goBack () {
      console.log('go back')
    }
  },
  created () {
    this.title = this.appTitle
  }
}
</script>
