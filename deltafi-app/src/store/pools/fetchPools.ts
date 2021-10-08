/* eslint-disable no-nested-ternary */
import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
// import poolsABI from 'config/abi/pool.json'
import multicall from 'util/multicall'
import { getAddress } from 'util/addressHelpers'
import BigNumber from 'bignumber.js'

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'endBlock',
    }
  })
  const callsLockBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'lockBlock',
    }
  })

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)
  const locks = await multicall(sousChefABI, callsLockBlock)

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    const lockBlock = locks[index]
    return {
      sousId: cakePoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
      lockBlock: new BigNumber(lockBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStatking = async () => {
  return []  
}
