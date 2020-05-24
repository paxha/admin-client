<template>
  <a-drawer
    title="Create a new brand"
    :width="720"
    :visible="createVisible"
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
            <a-input v-model="brand.name"  placeholder="Name"/>
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
      logo: null,
      cover: null,
      logoPreviewVisible: false,
      logoPreviewImage: '',
      brand: {},
      loading: false,
      error: {}
    }
  },
  methods: {
    ...mapActions({
      createAction: 'brand/create'
    }),
    onClose () {
      this.brand = {}
      this.$emit('hideCreateDrawer')
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
      if (info.file.status === 'done') {
        this.cover = info.file.response.url
      }
      if (info.file.status === 'removed') {
        this.cover = null
      }
    },
    async create () {
      this.loading = true
      this.brand.logo = this.logo
      this.brand.cover = this.cover
      await this.createAction(this.brand).then(() => {
        this.loading = false
        this.onClose()
        this.$notification.success({
          message: 'Brand successfully created',
          description: 'Brand successfully created'
        })
      }).catch(error => {
        this.loading = false
        this.$notification.error({
          message: 'Brand failed to create',
          description: error.response.data.message
        })
        this.error = error.response.data
      })
    }
  }
}
</script>

<style>
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
