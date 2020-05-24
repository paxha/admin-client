<template>
  <a-layout style="padding: 0 24px 24px" :style="{marginTop: '64px'}">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>
        <router-link :to="{name: 'home'}">
          Home
        </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <router-link :to="{name: 'product'}">
          Product
        </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Brand</a-breadcrumb-item>
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
        New brand
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
      v-if="createVisible"
    />
    <Edit
      :editVisible="editVisible"
      @hideEditDrawer="hideEditDrawer"
      :brandId="brandId"
      v-if="editVisible"
    />
    <Show
      :showVisible="showVisible"
      @hideShowModal="hideShowModal"
      :brand="brand"
      v-if="showVisible"
    />
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="brands"
      tableLayout="_"
    >
        <span slot="action" slot-scope="text, record">
          <a @click="showEditDrawer(record.id)">Edit</a>
          <a-divider type="vertical"/>
           <a-popconfirm
             title="Sure to delete?"
             @confirm="() => onDelete(record.id)"
           >
          <a href="javascript:">Delete</a>
        </a-popconfirm>
        </span>
      <span slot="popular" slot-scope="text, record">
        <a-switch :defaultChecked="!!record.popular" @click="togglePopular(record.id)" :loading="togglePopularLoading === record.id">
          <a-icon slot="checkedChildren" type="check" />
          <a-icon slot="unCheckedChildren" type="close" />
        </a-switch>
      </span>
      <span slot="active" slot-scope="text, record">
        <a-switch :defaultChecked="!!record.active" @click="toggleActive(record.id)" :loading="toggleLoading === record.id">
          <a-icon slot="checkedChildren" type="check" />
          <a-icon slot="unCheckedChildren" type="close" />
        </a-switch>
      </span>
      <span slot="last_update" slot-scope="text, record">
        <span>
          <a-avatar :style="{backgroundColor:record.updater.color, opacity: 0.6}">
            {{ record.updater.name.charAt(0).toUpperCase() }}
          </a-avatar>
          <span style="padding-left: 4px; line-height: 0;">
            <a>{{ record.updater.name }}</a>
            <span style="padding-left: 36px; display: block">{{ record.updated_at }}</span>
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
import Create from './create'
import Edit from './edit'
import axios from 'axios'
import Show from './show'

const columns = [
  {
    title: 'Name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Popular',
    key: 'popular',
    scopedSlots: { customRender: 'popular' }
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
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'index',
  components: { Show, Edit, Create },
  beforeCreate () {
    this.$store.dispatch('brand/index')
  },
  data () {
    return {
      columns,
      selectedRowKeys: [],
      form: this.$form.createForm(this),
      createVisible: false,
      editVisible: false,
      showVisible: false,
      brandId: null,
      toggleLoading: null,
      togglePopularLoading: null,
      brand: {}
    }
  },
  computed: {
    ...mapGetters({
      brands: 'brand/brands'
    }),
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    showCreateDrawer () {
      this.createVisible = true
    },
    showEditDrawer (brandId) {
      this.brandId = brandId
      this.editVisible = true
    },
    showShowModal (brand) {
      this.brand = brand
      this.showVisible = true
    },
    hideCreateDrawer () {
      this.createVisible = false
    },
    hideEditDrawer () {
      this.editVisible = false
    },
    hideShowModal () {
      this.showVisible = false
    },
    async toggleActive (id) {
      this.toggleLoading = id
      await axios.get(`brand/${id}/toggle-active`).then(response => {
        this.toggleLoading = null
        this.$store.dispatch('brand/index')
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
    async togglePopular (id) {
      this.togglePopularLoading = id
      await axios.get(`brand/${id}/toggle-popular`).then(response => {
        this.togglePopularLoading = null
        this.$store.dispatch('brand/index')
        this.$notification.success({
          message: response.data.message,
          description: response.data.message
        })
      }).then(error => {
        this.togglePopularLoading = null
        this.$notification.success({
          message: error.response.data.message,
          description: error.response.data.message
        })
      })
    },
    async onDelete (id) {
      await axios.delete(`brand/${id}/delete`).then(() => {
        this.$store.dispatch('brand/index')
        this.$notification.success({
          message: 'Brand successfully deleted',
          description: 'Brand successfully deleted'
        })
      }).catch(error => {
        this.$notification.error({
          message: 'Brand failed to delete',
          description: error.response.data.message
        })
      })
    },
    async onManyDelete () {
      await axios.delete('brands/delete', {
        data: { attributes: this.selectedRowKeys }
      }).then(() => {
        this.selectedRowKeys = []
        this.$store.dispatch('brand/index')
        this.$notification.success({
          message: 'Brands successfully deleted',
          description: 'Brands successfully deleted'
        })
      }).catch(error => {
        this.$notification.error({
          message: 'Brands failed to delete',
          description: error.response.data.message
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
