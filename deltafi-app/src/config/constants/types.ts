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

export interface PoolConfig {
  sousId: number
  earningToken: Token
  stakingToken: Token
  stakingLimit?: number
  contractAddress: Address
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  lockBlock?: number
  tvl: string,
}

export interface FarmConfig {
  sousId: number
  earningToken: Token
  stakingToken: Token
  stakingLimit?: number
  contractAddress: Address
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  lockBlock?: number
  tvl: string,
  apy: string,
}

export interface SwapCard {
  token: Token
  amount: string | number
  balance: string | number
  unit: string | number
}