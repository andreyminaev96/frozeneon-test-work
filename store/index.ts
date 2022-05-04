import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { PackagesInterface } from '~/types/packages.interface'
import { PackageInterface } from '~/types/package.interface'

@Module
export default class extends VuexModule {
  packages: PackagesInterface[] = []
  package: PackageInterface | null = null
  loader: boolean = false
  error: string | null = null

  @Mutation
  setLoading(payload: boolean): void {
    this.loader = payload
  }

  @Mutation
  setPackages(payload: PackagesInterface[]): void {
    this.packages = payload
  }

  @Mutation
  setPackage(payload: PackageInterface): void {
    this.package = payload
  }

  @Mutation
  setError(payload: string | null): void {
    this.error = payload
  }

  @Action
  async handleChangeLoading(data: boolean): Promise<void> {
    await this.context.commit('setLoading', data)
  }

  @Action
  async handleChangePackages(data: PackagesInterface[]): Promise<void> {
    await this.context.commit('setPackages', data)
  }

  @Action
  async handleChangePackage(data: PackagesInterface): Promise<void> {
    await this.context.commit('setPackage', data)
  }

  @Action
  async handleChangeError(data: string | null): Promise<void> {
    await this.context.commit('setError', data)
  }

  get getLoader(): boolean {
    return this.loader
  }

  get getPackages(): PackagesInterface[] {
    return this.packages
  }

  get getPackage(): PackageInterface | null {
    return this.package
  }

  get getError(): string | null {
    return this.error
  }
}
