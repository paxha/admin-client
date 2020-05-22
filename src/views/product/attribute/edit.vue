<template>
  <a-drawer
    title="Update attribute"
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
          :defaultValue="selectedCategories"
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
          :defaultValue="selectedUnits"
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
      <a-button type="primary" @click="update" :loading="loading">
        Update
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'edit',
  props: ['editVisible', 'attributeId'],
  beforeCreate () {
    this.$store.dispatch('category/index')
    this.$store.dispatch('unit/index')
  },
  async mounted () {
    await axios.get(`attribute/${this.attributeId}/edit`).then(response => {
      this.attribute = response.data.attribute
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
      newSelectedCategories: [],
      newSelectedUnits: [],
      attribute: {},
      loading: false,
      error: {}
    }
  },
  computed: {
    ...mapGetters({
      categories: 'category/categories',
      units: 'unit/units'
    }),
    selectedCategories () {
      return this.attribute.categories.map(category => {
        return category.id
      })
    },
    selectedUnits () {
      return this.attribute.units.map(unit => {
        return unit.id
      })
    }
  },
  methods: {
    onClose () {
      this.attribute = {}
      this.$emit('hideEditDrawer')
    },
    handleCategoryChange (selectedCategories) {
      this.newSelectedCategories = selectedCategories
    },
    handleUnitChange (selectedUnits) {
      this.newSelectedUnits = selectedUnits
    },
    async update () {
      this.loading = true
      console.log('abc', this.newSelectedUnits.length > 0 ? this.newSelectedUnits : this.selectedUnits)
      this.attribute.categories = this.newSelectedCategories.length > 0 ? this.newSelectedCategories : this.selectedCategories
      this.attribute.units = this.newSelectedUnits.length > 0 ? this.newSelectedUnits : this.selectedUnits
      await axios.put(`attribute/${this.attribute.id}/update`, this.attribute).then(() => {
        this.$store.dispatch('attribute/index')
        this.loading = false
        this.onClose()
        this.$notification.success({
          message: 'Attribute successfully updated',
          description: 'Attribute successfully updated'
        })
      }).catch(error => {
        this.loading = false
        this.$notification.error({
          message: 'Attribute failed to update',
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
