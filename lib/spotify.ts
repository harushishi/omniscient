export interface ISUser {
  country: string
  display_name: string
  email: string
  explicit_content: ISExplicitContent
  external_urls: ISExternalUrls
  followers: ISFollowers
  href: string
  id: string
  images: ISImage[]
  product: string
  type: string
  uri: string
}

export interface ISUserPlaylists {
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  total: number
  items: ISItem[]
}

export interface ISPlaylist {
  collaborative: boolean
  description: string
  external_urls: ISExternalUrls
  followers: ISFollowers
  href: string
  id: string
  images: ISImage[]
  name: string
  owner: ISOwner
  public: boolean
  snapshot_id: string
  tracks: ISTracks
  type: string
  uri: string
}

export interface ISItem {
  collaborative: boolean
  description: string
  external_urls: ISExternalUrls
  href: string
  id: string
  images: ISImage[]
  name: string
  owner: ISOwner
  public: boolean
  snapshot_id: string
  tracks: ISTracks
  type: string
  uri: string
}

export interface ISTracks {
  href: string
  total: number
}

export interface ISOwner {
  external_urls: ISExternalUrls2
  followers: ISFollowers
  href: string
  id: string
  type: string
  uri: string
  display_name: string
}

export interface ISExternalUrls2 {
  spotify: string
}

export interface ISExplicitContent {
  filter_enabled: boolean
  filter_locked: boolean
}

export interface ISExternalUrls {
  spotify: string
}

export interface ISFollowers {
  href: string
  total: number
}

export interface ISImage {
  url: string
  height: number
  width: number
}