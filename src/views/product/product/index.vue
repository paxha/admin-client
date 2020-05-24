<template>
  <a-layout style="padding: 0 24px 24px" :style="{marginTop: '64px'}">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>
        <router-link :to="{name: 'home'}">
          Home
        </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Product</a-breadcrumb-item>
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
        New product
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Selected ${selectedRowKeys.length} items` }}
        </template>
      </span>
    </div>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="variations"
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
      <span slot="continue" slot-scope="text, record">
        <a-switch :defaultChecked="!!record.continue" @click="toggleContinue(record.id)" :loading="toggleContinueLoading === record.id">
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
import axios from 'axios'

const columns = [
  {
    title: 'Name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Sale Price',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Continue',
    key: 'continue',
    scopedSlots: { customRender: 'continue' }
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
  beforeCreate () {
    this.$store.dispatch('variation/index')
  },
  data () {
    return {
      columns,
      selectedRowKeys: [],
      form: this.$form.createForm(this),
      toggleLoading: null,
      toggleContinueLoading: null
    }
  },
  computed: {
    ...mapGetters({
      variations: 'variation/variations'
    }),
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    async toggleActive (id) {
      this.toggleLoading = id
      await axios.get(`variation/${id}/toggle-active`).then(response => {
        this.toggleLoading = null
        this.$store.dispatch('variation/index')
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
    async toggleContinue (id) {
      this.toggleContinueLoading = id
      await axios.get(`variation/${id}/toggle-continue`).then(response => {
        this.toggleContinueLoading = null
        this.$store.dispatch('variation/index')
        this.$notification.success({
          message: response.data.message,
          description: response.data.message
        })
      }).then(error => {
        this.toggleVariationLoading = null
        this.$notification.success({
          message: error.response.data.message,
          description: error.response.data.message
        })
      })
    },
    async onDelete (id) {
      await axios.delete(`variation/${id}/delete`).then(() => {
        this.$store.dispatch('variation/index')
        this.$notification.success({
          message: 'Variation successfully deleted',
          description: 'Variation successfully deleted'
        })
      }).catch(error => {
        this.$notification.error({
          message: 'Variation failed to delete',
          description: error.response.data.message
        })
      })
    },
    async onManyDelete () {
      await axios.delete('variations/delete', {
        data: { variations: this.selectedRowKeys }
      }).then(() => {
        this.selectedRowKeys = []
        this.$store.dispatch('variation/index')
        this.$notification.success({
          message: 'Variations successfully deleted',
          description: 'Variations successfully deleted'
        })
      }).catch(error => {
        this.$notification.error({
          message: 'Variations failed to delete',
          description: error.response.data.message
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
