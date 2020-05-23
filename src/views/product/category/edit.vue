<template>
  <a-drawer
    title="Update category"
    :width="720"
    :visible="editVisible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Basics">
        <a-form :form="form" layout="vertical">
          <a-form-item
            label="Parent Category"
            :validate-status="!!error.errors ? (!!error.errors.parent_id ? 'error' : null) : null"
            :help="!!error.errors ? (!!error.errors.parent_id ? error.errors.parent_id[0] : null) : null"
          >
            <a-tree-select
              v-model="category.parent_id"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="categories"
              placeholder="Choose a parent category"
              :allowClear="true"
            />
          </a-form-item>
          <a-form-item
            label="Category Name"
            :validate-status="!!error.errors ? (!!error.errors.name ? 'error' : null) : null"
            :help="!!error.errors ? (!!error.errors.name ? error.errors.name[0] : null) : null"
          >
            <a-input v-model="category.name"/>
          </a-form-item>
          <a-form-item
            label="Category Icon"
            :validate-status="!!error.errors ? (!!error.errors.icon ? 'error' : null) : null"
            :help="!!error.errors ? (!!error.errors.icon ? error.errors.icon[0] : null) : null"
          >
            <a-input v-model="category.icon"/>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="SEO">
        <a-form :form="form" layout="vertical">
          <a-form-item
            label="Meta Title"
            :validate-status="!!error.errors ? (!!error.errors.meta_title ? 'error' : null) : null"
            :help="!!error.errors ? (!!error.errors.meta_title ? error.errors.meta_title[0] : null) : null"
          >
            <a-input v-model="category.meta_title" placeholder="Meta Title" allow-clear/>
          </a-form-item>
          <a-form-item
            label="Meta Keywords"
            :validate-status="!!error.errors ? (!!error.errors.meta_keywords ? 'error' : null) : null"
            :help="!!error.errors ? (!!error.errors.meta_keywords ? error.errors.meta_keywords[0] : null) : null"
          >
            <a-textarea v-model="category.meta_keywords" placeholder="Meta Keywords" allow-clear/>
          </a-form-item>
          <a-form-item
            label="Meta Description"
            :validate-status="!!error.errors ? (!!error.errors.meta_description ? 'error' : null) : null"
            :help="!!error.errors ? (!!error.errors.meta_description ? error.errors.meta_description[0] : null) : null"
          >
            <a-textarea v-model="category.meta_description" placeholder="Meta Keywords" allow-clear/>
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
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'edit',
  props: ['editVisible', 'categoryId'],
  async mounted () {
    await axios.get(`category/${this.categoryId}/edit`).then(response => {
      this.category = response.data.category
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
      category: {},
      loading: false,
      error: {}
    }
  },
  computed: {
    ...mapGetters({
      categories: 'category/categories'
    })
  },
  methods: {
    onClose () {
      this.category = {}
      this.$emit('hideEditDrawer')
    },
    async update () {
      this.loading = true
      await axios.put(`category/${this.category.id}/update`, this.category).then(() => {
        this.$store.dispatch('category/index')
        this.loading = false
        this.onClose()
        this.$notification.success({
          message: 'Category successfully updated',
          description: 'Category successfully updated'
        })
      }).catch(error => {
        this.loading = false
        this.$notification.error({
          message: 'Category failed to update',
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
