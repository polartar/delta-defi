import { useMemo } from 'react'
import useWeb3 from 'hooks/useWeb3'
import {
  getERC20Contract,
} from 'util/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */


export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getERC20Contract(address, web3), [address, web3])
}