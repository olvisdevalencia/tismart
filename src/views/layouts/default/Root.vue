<template>
  <el-container style="border: none; height: 100vh;">
    <el-aside style="background-color: #FCFDFF;">
      <Aside />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main class="mt-5">
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from '@/views/layouts/default/Header'
import Aside from '@/views/layouts/default/Aside'

export default {
  name: 'layouts.default.root',
  components: {
    Header,
    Aside
  }
}
</script>
<style lang="scss">
  @charset "UTF-8";
  .el-container {
    background-color: rgba(18,131,255,0.05);
  }
  .el-aside {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
</style>
