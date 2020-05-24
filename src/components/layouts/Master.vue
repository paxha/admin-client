<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <Sidebar/>
    <a-layout :style="{ marginLeft: '260px' }">
      <Header/>
      <router-view></router-view>
    </a-layout>
  </a-layout>
</template>

<script>
import Sidebar from './partials/Sidebar'
import Header from './partials/Header'
export default {
  name: 'Master',
  components: { Sidebar, Header }
}
</script>

<style>
  #components-layout-demo-fixed-sider .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>
