import { Ref, useStore } from '@nuxtjs/composition-api'

export default function useGetPackagesSetting(page: Ref<number>) {
  const store = useStore()
  const setGetPackagesLogic = async (): Promise<void> => {
    try {
      await store.dispatch('handleChangeLoading', true)
      const res = await fetch(
        `https://data.jsdelivr.com/v1/stats/packages?limit=10&page=${page.value}`,
        {
          method: 'GET',
        }
      )
      await store.dispatch('handleChangePackages', await res.json())
      await store.dispatch('handleChangeLoading', false)
    } catch (e) {
      await store.dispatch('handleChangeError', 'Something went wrong')
    }
  }
  return {
    setGetPackagesLogic,
  }
}
