<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', padding: 0 }">
    <a-menu
      theme="light"
      mode="horizontal"
      :default-selected-keys="['1']"
      :style="{ lineHeight: '64px' }"
    >
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper"
        ><a-icon type="user"/> {{ user.name }}</span
        >
        <a-menu-item-group title="General">
          <a-menu-item key="Profile">
            Profile
          </a-menu-item>
        </a-menu-item-group>
        <a-menu-item key="logout">
          <a @click.prevent="logout">
            Logout
          </a>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      logoutAction: 'auth/logout'
    }),
    logout () {
      this.logoutAction().then(() => {
        this.$router.replace({
          name: 'login'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
