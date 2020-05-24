<template>
  <a-layout-sider width="260" theme="light" :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
    <div class="logo" />
    <a-menu theme="light" mode="inline" :default-selected-keys="[currentRouteName]">
      <a-menu-item key="home">
        <router-link :to="{name: 'home'}">
          <a-icon type="home"/>
          <span class="nav-text">
          Home
        </span>
        </router-link>
      </a-menu-item>
      <template v-for="module in modules">
        <template v-if="!!module.children">
          <a-sub-menu :key="module.slug">
            <span slot="title"><a-icon :type="module.icon"/><span>{{ module.alias }}</span></span>
            <a-menu-item v-bind:key="child.slug" v-for="child in module.children">
              <router-link :to="{ name: child.slug }">
                {{ child.alias }}
              </router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="module.slug">
            <router-link :to="{ name: module.slug }">
              <a-icon :type="module.icon"/>
              <span class="nav-text">
                {{ module.alias }}
              </span>
            </router-link>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters({
      modules: 'module/modules'
    }),
    ...mapActions({
      logoutAction: 'auth/logout'
    }),
    currentRouteName () {
      return this.$route.name
    }
  }
}
</script>

<style scoped>

</style>
