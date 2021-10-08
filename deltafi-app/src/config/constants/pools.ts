import tokens from './tokens'
import { PoolConfig } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 8,
    stakingToken: tokens.sol,
    earningToken: tokens.usdc,
    contractAddress: {
      1: '',
      42: '',
    },
    harvest: true,
    tokenPerBlock: '2.5',
    sortOrder: 1,
    isFinished: false,
    tvl: '33556000',
  },
  {
    sousId: 9,
    stakingToken: tokens.sol,
    earningToken: tokens.srm,
    contractAddress: {
      1: '',
      42: '',
    },
    harvest: true,
    tokenPerBlock: '2.5',
    sortOrder: 1,
    isFinished: false,
    tvl: '23155000',
  },
  {
    sousId: 10,
    stakingToken: tokens.sol,
    earningToken: tokens.usdt,
    contractAddress: {
      1: '',
      42: '',
    },
    harvest: true,
    tokenPerBlock: '2.5',
    sortOrder: 1,
    isFinished: false,
    tvl: '14711000',
  },
  {
    sousId: 11,
    stakingToken: tokens.srm,
    earningToken: tokens.usdc,
    contractAddress: {
      1: '',
      42: '',
    },
    harvest: true,
    tokenPerBlock: '2.5',
    sortOrder: 1,
    isFinished: false,
    tvl: '33556000',
  },
  {
    sousId: 12,
    stakingToken: tokens.srm,
    earningToken: tokens.usdt,
    contractAddress: {
      1: '',
      42: '',
    },
    harvest: true,
    tokenPerBlock: '2.5',
    sortOrder: 1,
    isFinished: false,
    tvl: '14711000',
  },
]

export default pools
