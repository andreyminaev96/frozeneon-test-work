import { useStore } from '@nuxtjs/composition-api'

export default function useGetPackageSetting() {
  const store = useStore()
  const setGetPackageLogic = async (
    directory: string,
    name: string
  ): Promise<void> => {
    try {
      const res = await fetch(
        `https://data.jsdelivr.com/v1/package/${directory}/${name}`,
        {
          method: 'GET',
        }
      )
      await store.dispatch('handleChangePackage', await res.json())
    } catch (e) {
      await store.dispatch('handleChangeError', 'Something went wrong')
    }
  }
  return {
    setGetPackageLogic,
  }
}
