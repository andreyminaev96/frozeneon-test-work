<template>
  <div>
    <h1 class="pb-2">Packages Board</h1>
    <packages-table
      :packages="getPackages"
      :loading="getLoader"
      @clickTableRowEmitter="handlerClickTableRowEmitter"
    />
    <custom-pagination
      class="pt-2"
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
import useGetPackagesSetting from '~/hooks/useGetPackagesSetting'
import useGetPackageSetting from '~/hooks/useGetPackageSetting'
import { PackagesInterface } from '~/types/packages.interface'
import { PackageInterface } from '~/types/package.interface'

export default defineComponent({
  setup() {
    const store = useStore()
    const openModal = ref<boolean>(false)
    const page = ref<number>(1)
    const currentPackageName = ref<string>('')
    const getPackage = computed(
      (): PackageInterface => store.getters.getPackage
    )
    const getPackages = computed(
      (): PackagesInterface[] => store.getters.getPackages
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
    }: PackagesInterface): Promise<void> => {
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
