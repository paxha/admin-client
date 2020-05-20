<template>
  <a-modal v-model="showVisible" title="Category info" @ok="onClose" @cancel="onClose" :centered="true" :afterClose="onClose">
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
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1<br />
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>

<script>
export default {
  name: 'Show',
  props: ['showVisible', 'hideShowModal', 'category'],
  methods: {
    onClose () {
      console.log('abccc')
      this.$emit('hideShowModal')
    }
  }
}
</script>

<style scoped>

</style>
