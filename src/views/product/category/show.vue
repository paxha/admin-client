<template>
  <a-modal v-model="showVisible" title="Category info" @ok="onClose" @cancel="onClose" :centered="true" :afterClose="onClose">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Basics">
        <a-descriptions bordered>
          <a-descriptions-item label="Name" :span="1.5">
            {{ category.name }}
          </a-descriptions-item>
          <a-descriptions-item label="Icon" :span="1.5">
            {{ category.icon }}
          </a-descriptions-item>
          <a-descriptions-item label="Slug" :span="3">
            {{ category.slug }}
          </a-descriptions-item>
          <a-descriptions-item label="Updated By" :span="1.5">
            {{ category.updater.name }}
          </a-descriptions-item>
          <a-descriptions-item label="Last Update" :span="1.5">
            {{ category.updated_at }}
          </a-descriptions-item>
          <a-descriptions-item label="Created By" :span="1.5">
            {{ category.creator.name }}
          </a-descriptions-item>
          <a-descriptions-item label="Created" :span="1.5">
            {{ category.created_at }}
          </a-descriptions-item>
          <a-descriptions-item label="Status" :span="3">
            <a-badge :status="category.active ? 'processing' : 'error'" :text="category.active ? 'RUNNING' : 'IDLE'" />
          </a-descriptions-item>
          <a-descriptions-item label="Attributes">
            <a-tag v-bind:key="attribute.id" v-for="attribute in category.attributes" color="#108ee9" style="margin-top: 6px">
              {{ attribute.name }}
            </a-tag>
          </a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
      <a-tab-pane key="2" tab="SEO">
        <a-descriptions bordered>
          <a-descriptions-item label="Meta Title" :span="3">
            {{ category.meta_title }}
          </a-descriptions-item>
          <a-descriptions-item label="Meta Keywords" :span="3">
            {{ category.meta_keywords }}
          </a-descriptions-item>
          <a-descriptions-item label="Meta Description" :span="3">
            {{ category.meta_description }}
          </a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
export default {
  name: 'show',
  props: ['showVisible', 'hideShowModal', 'category'],
  methods: {
    onClose () {
      this.$emit('hideShowModal')
    }
  }
}
</script>

<style scoped>

</style>
