<template>
  <a-layout style="padding: 0 24px 24px" :style="{marginTop: '64px'}">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>List</a-breadcrumb-item>
      <a-breadcrumb-item>App</a-breadcrumb-item>
    </a-breadcrumb>
    <div style="margin-bottom: 16px">
      <a-popconfirm
        title="Sure to delete?"
        @confirm="() => onManyDelete()"
      >
        <a-button type="danger" :disabled="!hasSelected">
          Delete
        </a-button>
      </a-popconfirm>
      <a-button type="primary" style="margin-left: 8px" @click="showCreateDrawer()">
        <a-icon type="plus"/>
        New category
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Selected ${selectedRowKeys.length} items` }}
        </template>
      </span>
    </div>
    <Create
      :createVisible="createVisible"
      @hideCreateDrawer="hideCreateDrawer"
      :parentId="parentId"
      v-if="createVisible"
    />
    <Edit
      :editVisible="editVisible"
      @hideEditDrawer="hideEditDrawer"
      :categoryId="categoryId"
      v-if="editVisible"
    />
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="categories"
      tableLayout="_"
    >
        <span slot="action" slot-scope="text, record">
          <a @click="showCreateDrawer(record.id)"><a-icon type="plus"/> New Child</a>
          <a-divider type="vertical"/>
          <a @click="showEditDrawer(record.id)">Edit</a>
          <a-divider type="vertical"/>
           <a-popconfirm
             title="Sure to delete?"
             @confirm="() => onDelete(record.id)"
           >
          <a href="javascript:">Delete</a>
        </a-popconfirm>
        </span>
      <span slot="active" slot-scope="text, record">
        <a-switch :defaultChecked="record.active" @click="toggleActive(record.id)" :loading="toggleLoading === record.id"/>
      </span>
    </a-table>
  </a-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Create from './Create'
import Edit from './Edit'
import axios from 'axios'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug'
  },
  {
    title: 'Icon',
    dataIndex: 'icon',
    key: 'icon'
  },
  {
    title: 'Active',
    key: 'active',
    scopedSlots: { customRender: 'active' }
  },
  {
    title: 'Last Update',
    dataIndex: 'updated_at',
    key: 'updated_at'
  },
  {
    title: 'Created',
    dataIndex: 'created_at',
    key: 'created_at'
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'Category',
  components: { Edit, Create },
  beforeCreate () {
    this.$store.dispatch('category/index')
  },
  data () {
    return {
      columns,
      selectedRowKeys: [],
      form: this.$form.createForm(this),
      createVisible: false,
      editVisible: false,
      parentId: null,
      categoryId: null,
      toggleLoading: null
    }
  },
  computed: {
    ...mapGetters({
      categories: 'category/categories'
    }),
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    showCreateDrawer (parentId = null) {
      this.parentId = parentId
      this.createVisible = true
    },
    showEditDrawer (categoryId = null) {
      this.categoryId = categoryId
      this.editVisible = true
    },
    hideCreateDrawer () {
      this.createVisible = false
    },
    hideEditDrawer () {
      this.editVisible = false
    },
    async toggleActive (id) {
      this.toggleLoading = id
      await axios.get(`category/${id}/toggle-active`).then(response => {
        this.toggleLoading = null
        this.$store.dispatch('category/index')
        this.$notification.success({
          message: response.data.message,
          description: response.data.message
        })
      }).then(error => {
        this.toggleLoading = null
        this.$notification.success({
          message: error.response.data.message,
          description: error.response.data.message
        })
      })
    },
    async onDelete (id) {
      await axios.delete(`category/${id}/delete`).then(() => {
        this.$store.dispatch('category/index')
        this.$notification.success({
          message: 'Category successfully deleted',
          description: 'Category successfully deleted'
        })
      }).catch(error => {
        this.$notification.error({
          message: 'Category failed to delete',
          description: error.response.data.message
        })
      })
    },
    async onManyDelete () {
      await axios.delete('categories/delete', {
        data: { categories: this.selectedRowKeys }
      }).then(() => {
        this.selectedRowKeys = []
        this.$store.dispatch('category/index')
        this.$notification.success({
          message: 'Categories successfully deleted',
          description: 'Categories successfully deleted'
        })
      }).catch(error => {
        this.$notification.error({
          message: 'Categories failed to delete',
          description: error.response.data.message
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
