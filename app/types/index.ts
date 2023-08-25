export const Providers = {Spotify:"spotify", Youtube:"youtube", Apple:"apple"} as const

export type TProviders = keyof typeof Providers

export type TGenericSong = {
  id: string,
  name: string, 
  album?: string,
  artist: string,
  logoUrl: string,
  duration: string,  
}