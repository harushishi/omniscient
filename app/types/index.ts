export const Providers = {Spotify:"spotify", Youtube:"youtube", Apple:"apple"} as const

export type TProviders = keyof typeof Providers