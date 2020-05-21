<template>
  <a-drawer
    title="Create a new category"
    :width="720"
    :visible="createVisible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-form :form="form" layout="vertical">
      <a-form-item
        label="Parent Category"
        :validate-status="!!error.errors ? (!!error.errors.parent_id ? 'error' : null) : null"
        :help="!!error.errors ? (!!error.errors.parent_id ? error.errors.parent_id[0] : null) : null"
      >
        <a-tree-select
          :defaultValue="parentId"
          @change="onParentIdChange"
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'create',
  props: ['createVisible', 'parentId'],
  data () {
    return {
      form: this.$form.createForm(this),
      newParentId: null,
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
    ...mapActions({
      createAction: 'category/create'
    }),
    onClose () {
      this.category = {}
      this.$emit('hideCreateDrawer')
    },
    onParentIdChange (parentId) {
      this.newParentId = parentId
    },
    async create () {
      this.loading = true
      this.category.parent_id = this.newParentId || this.parentId
      await this.createAction(this.category).then(() => {
        this.loading = false
        this.onClose()
        this.$notification.success({
          message: 'Category successfully created',
          description: 'Category successfully created'
        })
      }).catch(error => {
        this.loading = false
        this.$notification.error({
          message: 'Category failed to create',
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
