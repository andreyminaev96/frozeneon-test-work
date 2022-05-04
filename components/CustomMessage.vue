<template>
  <v-alert
    class="custom-alert"
    type="error"
    width="250"
    dense
    shaped
    transition="slide-x-transition"
    >{{ messageText }}</v-alert
  >
</template>

<script lang="ts">
import { defineComponent, useStore, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    messageText: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    watch(props, ({ messageText }): void => {
      if (!messageText.length) return
      setTimeout(() => store.dispatch('handleChangeError', null), 1500)
    })
    return {}
  },
})
</script>
