<template>
  <div>
    <h1 class="pb-2">Packages Board</h1>
    <packages-table
      :packages="getPackages"
      :loading="getLoader"
      @clickTableRowEmitter="handlerClickTableRowEmitter"
    />
    <custom-pagination
      :total="100"
      :model-value="page"
      :current-page="page"
      @update:modelValue="page = $event"
    />
    <package-modal
      v-if="openModal && getPackage"
      :name="currentPackageName"
      :package="getPackage"
      @closeModalEmitter="handlerCloseModalEmitter"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useStore,
  watch,
} from '@nuxtjs/composition-api'
import { PackageInterface } from '~/types/package.interface'
import useGetPackagesSetting from '~/hooks/useGetPackagesSetting'
import useGetPackageSetting from '~/hooks/useGetPackageSetting'

export default defineComponent({
  setup() {
    const store = useStore()
    const openModal = ref<boolean>(false)
    const page = ref<number>(1)
    const currentPackageName = ref<string>('')
    const getPackage = computed((): any => store.getters.getPackage)
    const getPackages = computed(
      (): PackageInterface[] => store.getters.getPackages
    )
    const getLoader = computed((): boolean => store.getters.getLoader)
    watch(page, () => setGetPackagesLogic())
    const handlerCloseModalEmitter = async (data: boolean): Promise<void> => {
      await store.dispatch('handleChangePackage', null)
      currentPackageName.value = ''
      openModal.value = data
    }
    const handlerClickTableRowEmitter = async ({
      type,
      name,
    }: PackageInterface): Promise<void> => {
      await setGetPackageLogic(type, name)
      currentPackageName.value = name
      openModal.value = true
    }
    onMounted(async (): Promise<void> => await setGetPackagesLogic())
    const { setGetPackagesLogic } = useGetPackagesSetting(page)
    const { setGetPackageLogic } = useGetPackageSetting()
    return {
      page,
      getPackages,
      getLoader,
      openModal,
      getPackage,
      currentPackageName,
      handlerCloseModalEmitter,
      handlerClickTableRowEmitter,
    }
  },
})
</script>
