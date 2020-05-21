<template>
  <a-modal v-model="showVisible" title="Unit info" @ok="onClose" @cancel="onClose" :centered="true" :afterClose="onClose">
    <a-descriptions bordered>
      <a-descriptions-item label="Name" :span="3">
        {{ unit.name }}
      </a-descriptions-item>
      <a-descriptions-item label="Updated By" :span="1.5">
        {{ unit.updater.name }}
      </a-descriptions-item>
      <a-descriptions-item label="Last Update" :span="1.5">
        {{ unit.updated_at }}
      </a-descriptions-item>
      <a-descriptions-item label="Created By" :span="1.5">
        {{ unit.creator.name }}
      </a-descriptions-item>
      <a-descriptions-item label="Created" :span="1.5">
        {{ unit.created_at }}
      </a-descriptions-item>
      <a-descriptions-item label="Status" :span="3">
        <a-badge :status="unit.active ? 'processing' : 'error'" :text="unit.active ? 'RUNNING' : 'IDLE'" />
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
  name: 'show',
  props: ['showVisible', 'hideShowModal', 'unit'],
  methods: {
    onClose () {
      this.$emit('hideShowModal')
    }
  }
}
</script>

<style scoped>

</style>
