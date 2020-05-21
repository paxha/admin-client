<template>
  <a-drawer
    title="Create a new unit"
    :width="720"
    :visible="createVisible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-form :form="form" layout="vertical">
      <a-form-item
        label="Name"
        :validate-status="!!error.errors ? (!!error.errors.name ? 'error' : null) : null"
        :help="!!error.errors ? (!!error.errors.name ? error.errors.name[0] : null) : null"
      >
        <a-input v-model="unit.name"/>
      </a-form-item>
    </a-form>
    <div
      :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
    >
      <a-button :style="{ marginRight: '8px' }" @click="onClose">
        Cancel
      </a-button>
      <a-button type="primary" @click="create" :loading="loading">
        Create
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'create',
  props: ['createVisible'],
  data () {
    return {
      form: this.$form.createForm(this),
      unit: {},
      loading: false,
      error: {}
    }
  },
  methods: {
    ...mapActions({
      createAction: 'unit/create'
    }),
    onClose () {
      this.unit = {}
      this.$emit('hideCreateDrawer')
    },
    async create () {
      this.loading = true
      await this.createAction(this.unit).then(() => {
        this.loading = false
        this.onClose()
        this.$notification.success({
          message: 'Unit successfully created',
          description: 'Unit successfully created'
        })
      }).catch(error => {
        this.loading = false
        this.$notification.error({
          message: 'Unit failed to create',
          description: error.response.data.message
        })
        this.error = error.response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
