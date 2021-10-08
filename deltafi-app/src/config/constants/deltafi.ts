import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
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
    apy: '25%'
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
    apy: '25%'
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
    apy: '25%'
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
    apy: '25%'
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
    apy: '25%'
  },
]

export default farms