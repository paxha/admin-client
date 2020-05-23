<template>
  <a-drawer
    title="Update brand"
    :width="720"
    :visible="editVisible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Basics">
        <a-form :form="form" layout="vertical">
          <a-form-item
            label="Name"
            :validate-status="!!error.errors ? (!!error.errors.name ? 'error' : null) : null"
            :help="!!error.errors ? (!!error.errors.name ? error.errors.name[0] : null) : null"
          >
            <a-input v-model="brand.name"/>
          </a-form-item>
          <a-form-item
            label="Description"
            :validate-status="!!error.errors ? (!!error.errors.desscription ? 'error' : null) : null"
            :help="!!error.errors ? (!!error.errors.description ? error.errors.description[0] : null) : null"
          >
            <a-textarea v-model="brand.description" placeholder="Description" allow-clear/>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Images" force-render>
        <a-form :form="form" layout="vertical">
          <a-form-item
            label="Logo"
            :validate-status="!!error.errors ? (!!error.errors.logo ? 'error' : null) : null"
            :help="!!error.errors ? (!!error.errors.logo ? error.errors.logo[0] : null) : null"
          >
            <div class="clearfix">
              <a-upload
                name="file"
                :multiple="false"
                :default-file-list="selectedLogo"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="true"
                action="http://localhost:8000/api/upload-image"
                @change="handleLogoChange"
              >
                <div v-if="!logo">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    Upload
                  </div>
                </div>
              </a-upload>
            </div>
          </a-form-item>
          <a-form-item
            label="Cover"
            :validate-status="!!error.errors ? (!!error.errors.cover ? 'error' : null) : null"
            :help="!!error.errors ? (!!error.errors.cover ? error.errors.cover[0] : null) : null"
          >
            <div class="clearfix">
              <a-upload
                name="file"
                :multiple="false"
                :default-file-list="selectedCover"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="true"
                action="http://localhost:8000/api/upload-image"
                @change="handleCoverChange"
              >
                <div v-if="!cover">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    Upload
                  </div>
                </div>
              </a-upload>
            </div>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="3" tab="SEO">
        <a-form :form="form" layout="vertical">
          <a-form-item
            label="Meta Title"
            :validate-status="!!error.errors ? (!!error.errors.meta_title ? 'error' : null) : null"
            :help="!!error.errors ? (!!error.errors.meta_title ? error.errors.meta_title[0] : null) : null"
          >
            <a-input v-model="brand.meta_title" placeholder="Meta Title" allow-clear/>
          </a-form-item>
          <a-form-item
            label="Meta Keywords"
            :validate-status="!!error.errors ? (!!error.errors.meta_keywords ? 'error' : null) : null"
            :help="!!error.errors ? (!!error.errors.meta_keywords ? error.errors.meta_keywords[0] : null) : null"
          >
            <a-textarea v-model="brand.meta_keywords" placeholder="Meta Keywords" allow-clear/>
          </a-form-item>
          <a-form-item
            label="Meta Description"
            :validate-status="!!error.errors ? (!!error.errors.meta_description ? 'error' : null) : null"
            :help="!!error.errors ? (!!error.errors.meta_description ? error.errors.meta_description[0] : null) : null"
          >
            <a-textarea v-model="brand.meta_description" placeholder="Meta Keywords" allow-clear/>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
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
        Update
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
import axios from 'axios'

export default {
  name: 'edit',
  props: ['editVisible', 'brandId'],
  async mounted () {
    await axios.get(`brand/${this.brandId}/edit`).then(response => {
      this.brand = response.data.brand
      this.logo = response.data.brand.logo
      this.cover = response.data.brand.cover
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
      logo: null,
      cover: null,
      brand: {},
      loading: false,
      error: {}
    }
  },
  computed: {
    selectedLogo () {
      return [{
        uid: '1',
        name: 'Logo',
        status: 'done',
        url: this.logo
      }]
    },
    selectedCover () {
      return [{
        uid: '1',
        name: 'Cover',
        status: 'done',
        url: this.cover
      }]
    }
  },
  methods: {
    onClose () {
      this.brand = {}
      this.$emit('hideEditDrawer')
    },
    handleLogoChange (info) {
      if (info.file.status === 'done') {
        this.logo = info.file.response.url
      }
      if (info.file.status === 'removed') {
        this.logo = null
      }
    },
    handleCoverChange (info) {
      console.log(info)
      if (info.file.status === 'done') {
        this.cover = info.file.response.url
      }
      if (info.file.status === 'removed') {
        this.cover = null
      }
    },
    async update () {
      this.loading = true
      this.brand.logo = this.logo || this.brand.logo
      this.brand.cover = this.cover || this.brand.cover
      await axios.put(`brand/${this.brand.id}/update`, this.brand).then(() => {
        this.$store.dispatch('brand/index')
        this.loading = false
        this.onClose()
        this.$notification.success({
          message: 'Brand successfully updated',
          description: 'Brand successfully updated'
        })
      }).catch(error => {
        this.loading = false
        this.$notification.error({
          message: 'Brand failed to update',
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
