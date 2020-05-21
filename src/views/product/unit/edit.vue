<template>
  <a-drawer
    title="Update unit"
    :width="720"
    :visible="editVisible"
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
      <a-button type="primary" @click="update" :loading="loading">
        Create
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
import axios from 'axios'

export default {
  name: 'edit',
  props: ['editVisible', 'unitId'],
  async mounted () {
    await axios.get(`unit/${this.unitId}/edit`).then(response => {
      this.unit = response.data.unit
    }).catch(error => {
      this.$notification.error({
        message: 'Failed to load data',
        description: error.response.data.message
      })
    })
  },
  data () {
    return {
      form: this.$form.createForm(this),
      unit: {},
      loading: false,
      error: {}
    }
  },
  methods: {
    onClose () {
      this.unit = {}
      this.$emit('hideEditDrawer')
    },
    async update () {
      this.loading = true
      await axios.put(`unit/${this.unit.id}/update`, this.unit).then(() => {
        this.$store.dispatch('unit/index')
        this.loading = false
        this.onClose()
        this.$notification.success({
          message: 'Unit successfully updated',
          description: 'Unit successfully updated'
        })
      }).catch(error => {
        this.loading = false
        this.$notification.error({
          message: 'Unit failed to update',
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
