<template>
  <a-modal v-model="showVisible" title="Attribute info" @ok="onClose" @cancel="onClose" :centered="true" :afterClose="onClose">
    <a-descriptions bordered>
      <a-descriptions-item label="Name" :span="3">
        {{ attribute.name }}
      </a-descriptions-item>
      <a-descriptions-item label="Updated By" :span="1.5">
        {{ attribute.updater.name }}
      </a-descriptions-item>
      <a-descriptions-item label="Last Update" :span="1.5">
        {{ attribute.updated_at }}
      </a-descriptions-item>
      <a-descriptions-item label="Created By" :span="1.5">
        {{ attribute.creator.name }}
      </a-descriptions-item>
      <a-descriptions-item label="Created" :span="1.5">
        {{ attribute.created_at }}
      </a-descriptions-item>
      <a-descriptions-item label="Status" :span="3">
        <a-badge :status="attribute.active ? 'processing' : 'error'" :text="attribute.active ? 'RUNNING' : 'IDLE'" />
      </a-descriptions-item>
      <a-descriptions-item label="Categories" :span="3">
        <a-tag v-bind:key="category.id" v-for="category in attribute.categories" color="#108ee9" style="margin-top: 6px">
          {{ category.name }}
        </a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="Units" :span="3">
        <a-tag v-bind:key="unit.id" v-for="unit in attribute.units" color="#108ee9" style="margin-top: 6px">
          {{ unit.name }}
        </a-tag>
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>

<script>
export default {
  name: 'show',
  props: ['showVisible', 'hideShowModal', 'attribute'],
  methods: {
    onClose () {
      this.$emit('hideShowModal')
    }
  }
}
</script>

<style scoped>

</style>
