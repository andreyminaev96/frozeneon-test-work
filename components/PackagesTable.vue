<template>
  <v-data-table
    class="employees-main-table custom-table"
    :headers="headers"
    :items="packages"
    :items-per-page="-1"
    :loading="loading"
    item-key="name"
    loading-text="Loading... Please wait"
    :search="search"
    :custom-filter="filter"
    @click:row="handlerClickTableRow"
  >
    <template #top>
      <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { TableHeaderInterface } from '~/types/tableHeader.interface'
import { PackagesInterface } from '~/types/packages.interface'

export default defineComponent({
  props: {
    packages: {
      type: Array as PropType<PackagesInterface[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const ctx = useContext()
    const search = ref<string>('')
    const headers: TableHeaderInterface[] = [
      { text: 'Type', align: 'start', value: 'type', options: false },
      { text: 'Name', value: 'name', options: false },
      { text: 'Hits', value: 'hits', options: false },
      { text: 'Band Width', value: 'bandwidth', options: false },
    ]

    const handlerClickTableRow = (data: any): void => {
      emit('clickTableRowEmitter', data)
    }
    const filter = (value: string, search: string): boolean =>
      value != null && search != null && value.toString().includes(search)
    return {
      ctx,
      headers,
      search,
      filter,
      handlerClickTableRow,
    }
  },
})
</script>
