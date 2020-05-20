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
    <Show
      :showVisible="showVisible"
      @hideShowModal="hideShowModal"
      :category="category"
      v-if="showVisible"
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
        <a-switch :defaultChecked="!!record.active" @click="toggleActive(record.id)" :loading="toggleLoading === record.id">
          <a-icon slot="checkedChildren" type="check" />
          <a-icon slot="unCheckedChildren" type="close" />
        </a-switch>
      </span>
      <span slot="last_update" slot-scope="text, record">
        <span>
          <a-avatar style="backgroundColor:#87d068" icon="user" />
          <span style="padding-left: 4px; line-height: 0;">
            <a>{{ record.updater.name }}</a>
            <span style="padding-left: 36px; display: block">{{ record.updated_at }}</span>
          </span>
        </span>
      </span>
      <span slot="created" slot-scope="text, record">
        <span>
          <a-avatar style="backgroundColor:#87d068" icon="user" />
          <span style="padding-left: 4px; line-height: 0">
            <a>{{ record.creator.name }}</a>
            <span style="padding-left: 36px; display: block">{{ record.created_at }}</span>
          </span>
        </span>
      </span>
      <span slot="name" slot-scope="text, record">
        <a @click="showShowModal(record)">{{ record.name }}</a>
      </span>
    </a-table>
  </a-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Create from './Create'
import Edit from './Edit'
import axios from 'axios'
import Show from './Show'

const columns = [
  {
    title: 'Name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Active',
    key: 'active',
    scopedSlots: { customRender: 'active' }
  },
  {
    title: 'Last Update',
    key: 'updated_at',
    scopedSlots: { customRender: 'last_update' }
  },
  {
    title: 'Created',
    key: 'created_at',
    scopedSlots: { customRender: 'created' }
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'Category',
  components: { Show, Edit, Create },
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
      showVisible: false,
      parentId: null,
      categoryId: null,
      toggleLoading: null,
      category: {}
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
    showShowModal (category) {
      this.category = category
      this.showVisible = true
    },
    hideCreateDrawer () {
      this.createVisible = false
    },
    hideEditDrawer () {
      this.editVisible = false
    },
    hideShowModal () {
      console.log('adfadsfdsf')
      this.showVisible = false
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
