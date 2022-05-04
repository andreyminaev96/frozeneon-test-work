<template>
  <!--  <el-pagination-->
  <!--    background-->
  <!--    layout="prev, pager, next"-->
  <!--    :total="total"-->
  <!--    :page-size="10"-->
  <!--    :current-page="currentPage"-->
  <!--    @current-change="handlerCurrentChangePagination"-->
  <!--  >-->
  <!--  </el-pagination>-->
  <v-pagination v-model="page" :length="total"></v-pagination>
</template>
<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    total: {
      type: Number,
      default: 0,
      required: true,
    },
    modelValue: {
      type: Number,
      default: 1,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  setup(props, { emit }) {
    const page = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    })
    return {
      page,
    }
  },
})
</script>
