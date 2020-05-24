<template>
  <a-modal v-model="showVisible" title="Brand info" @ok="onClose" @cancel="onClose" :centered="true"
           :afterClose="onClose">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Basics">
        <a-descriptions bordered>
          <a-descriptions-item label="Name" :span="1.5">
            {{ brand.name }}
          </a-descriptions-item>
          <a-descriptions-item label="ISO 2" :span="1.5">
            {{ brand.iso2 }}
          </a-descriptions-item>
          <a-descriptions-item label="Slug" :span="3">
            {{ brand.slug }}
          </a-descriptions-item>
          <a-descriptions-item label="Updated By" :span="1.5">
            {{ brand.updater.name }}
          </a-descriptions-item>
          <a-descriptions-item label="Last Update" :span="1.5">
            {{ brand.updated_at }}
          </a-descriptions-item>
          <a-descriptions-item label="Created By" :span="1.5">
            {{ brand.creator.name }}
          </a-descriptions-item>
          <a-descriptions-item label="Created" :span="1.5">
            {{ brand.created_at }}
          </a-descriptions-item>
          <a-descriptions-item label="Status" :span="3">
            <a-badge :status="brand.active ? 'processing' : 'error'" :text="brand.active ? 'RUNNING' : 'IDLE'"/>
          </a-descriptions-item>
          <a-descriptions-item label="Popular" :span="3">
            <a-badge :status="brand.popular ? 'success' : 'warning'" :text="brand.popular ? 'POPULAR' : 'NON POPULAR'"/>
          </a-descriptions-item>
          <a-descriptions-item label="Description" :span="3">
            {{ brand.description }}
          </a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Images">
        <a-descriptions bordered>
          <a-descriptions-item label="Logo" :span="3">
            <img v-if="brand.logo"
              width="100%"
              height="200"
              alt="example"
              :src="brand.logo"
            />
            <div v-else>
              No Logo
            </div>
          </a-descriptions-item>
          <a-descriptions-item label="Cover" :span="3">
            <img
              v-if="brand.cover"
              width="100%"
              alt="example"
              :src="brand.cover"
            />
            <div v-else>
              No Cover
            </div>
          </a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
      <a-tab-pane key="3" tab="SEO">
        <a-descriptions bordered>
          <a-descriptions-item label="Meta Title" :span="3">
            {{ brand.meta_title }}
          </a-descriptions-item>
          <a-descriptions-item label="Meta Keywords" :span="3">
            {{ brand.meta_keywords }}
          </a-descriptions-item>
          <a-descriptions-item label="Meta Description" :span="3">
            {{ brand.meta_description }}
          </a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
export default {
  name: 'show',
  props: ['showVisible', 'hideShowModal', 'brand'],
  methods: {
    onClose () {
      this.$emit('hideShowModal')
    }
  }
}
</script>

<style scoped>

</style>
