<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <custom-message
        v-show="getError"
        :message-text="!getError ? '' : getError"
      />
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="true" app dark padless>
      <v-card class="flex" flat tile>
        <v-card-title>
          <strong class="subheading">Minaiev Andrii</strong>
          <v-spacer></v-spacer>
          <v-btn class="mx-4" dark icon> gggg </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }}
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const title = 'Test Work'
    const store = useStore()
    const getError = computed((): string => store.getters.getError)
    return {
      getError,
      title,
    }
  },
})
</script>
