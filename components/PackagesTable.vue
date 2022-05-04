<template>
  <v-data-table
    class="employees-main-table custom-table"
    :headers="headers"
    :items="packages"
    :items-per-page="-1"
    :loading="loading"
    loading-text="Loading... Please wait"
    @click:row="handlerClickTableRow"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, useContext } from '@nuxtjs/composition-api'
import { PackageInterface } from '~/types/package.interface'
import { TableHeaderInterface } from '~/types/tableHeader.interface'

export default defineComponent({
  props: {
    packages: {
      type: Array as PropType<PackageInterface[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const ctx = useContext()
    const headers: TableHeaderInterface[] = [
      { text: 'Type', align: 'start', value: 'type', options: false },
      { text: 'Name', value: 'name', options: false },
      { text: 'Hits', value: 'hits', options: false },
      { text: 'Band Width', value: 'bandwidth', options: false },
    ]

    const handlerClickTableRow = (data: any): void => {
      emit('clickTableRowEmitter', data)
    }
    return {
      ctx,
      headers,
      handlerClickTableRow,
    }
  },
})
</script>
