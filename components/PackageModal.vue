<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      @click:outside="emit('closeModalEmitter', false)"
    >
      <v-card outlined shaped class="card-box">
        <v-card-title class="text-h5"> {{ name }}</v-card-title>
        <v-card-text>Latest: {{ package.tags.latest }}</v-card-text>
        <v-card-text class="custom-version-box">
          <div class="font-weight-bold ml-8 mb-2">Versions</div>

          <v-timeline align-top dense>
            <v-timeline-item
              v-for="version in package.versions"
              :key="version"
              :color="getRandomColor()"
              small
            >
              <div>
                <div>{{ version }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { PackageInterface } from '~/types/package.interface'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    package: {
      type: Object as PropType<PackageInterface>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const dialog = ref<boolean>(true)
    const getRandomColor = (): string => {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
    return {
      dialog,
      emit,
      getRandomColor,
    }
  },
})
</script>
<style>
.card-box {
  padding-bottom: 50px;
}
.custom-version-box {
  max-height: 300px;
  overflow: auto;
}
</style>
