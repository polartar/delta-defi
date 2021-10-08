export type PageMeta = {
  title: string
  description?: string
  image?: string
}

export interface Address {
  1?: string
  42: string
}

export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
  link?: string
}