interface PackageTagsInterface {
  latest: string
}
export interface PackageInterface {
  tags: PackageTagsInterface
  versions: string[]
}
