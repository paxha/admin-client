<template>
  <a-drawer
    title="Create a new attribute"
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
        <a-input v-model="attribute.name"/>
      </a-form-item>
      <a-form-item
        label="Categories"
        :validate-status="!!error.errors ? (!!error.errors.categories ? 'error' : null) : null"
        :help="!!error.errors ? (!!error.errors.categories ? error.errors.categories[0] : null) : null"
      >
        <a-select
          mode="multiple"
          placeholder="Choose multiple categories"
          v-model="attribute.categories"
          style="width: 100%"
          @change="handleCategoryChange"
        >
          <a-select-option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="Units"
        :validate-status="!!error.errors ? (!!error.errors.units ? 'error' : null) : null"
        :help="!!error.errors ? (!!error.errors.units ? error.errors.units[0] : null) : null"
      >
        <a-select
          mode="multiple"
          placeholder="Choose multiple units"
          v-model="attribute.units"
          style="width: 100%"
          @change="handleUnitChange"
        >
          <a-select-option v-for="unit in units" :key="unit.id" :value="unit.id">
            {{ unit.name }}
          </a-select-option>
        </a-select>
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
  props: ['createVisible'],
  data () {
    return {
      form: this.$form.createForm(this),
      attribute: {},
      loading: false,
      error: {}
    }
  },
  beforeCreate () {
    this.$store.dispatch('category/index')
    this.$store.dispatch('unit/index')
  },
  computed: {
    ...mapGetters({
      categories: 'category/categories',
      units: 'unit/units'
    })
  },
  methods: {
    ...mapActions({
      createAction: 'attribute/create'
    }),
    onClose () {
      this.attribute = {}
      this.$emit('hideCreateDrawer')
    },
    handleCategoryChange (selectedCategories) {
      this.attribute.categories = selectedCategories
    },
    handleUnitChange (selectedUnits) {
      this.attribute.units = selectedUnits
    },
    async create () {
      this.loading = true
      await this.createAction(this.attribute).then(() => {
        this.loading = false
        this.onClose()
        this.$notification.success({
          message: 'Attribute successfully created',
          description: 'Attribute successfully created'
        })
      }).catch(error => {
        this.loading = false
        this.$notification.error({
          message: 'Attribute failed to create',
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
