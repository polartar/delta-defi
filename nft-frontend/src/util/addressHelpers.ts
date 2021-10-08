import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'
import { MAINNET_CHAIN_ID } from 'config/constants/constant'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[MAINNET_CHAIN_ID]
}

/* 
* Sample Get Token Address
* You can change function name and param for your own contract
*/
export const getContractAddress = () => {
  return getAddress(addresses.contract)
}

export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
  
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}