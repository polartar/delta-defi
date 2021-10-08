import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'util/web3'
import { poolsConfig } from 'config/constants/constant'

// Addresses
import {
  getAddress,
} from 'util/addressHelpers'

// ABI
import erc20Abi from 'config/abi/erc20.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import sousChef from 'config/abi/sousChef.json'

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}
export const getERC20Contract = (address: string, web3?: Web3) => {
  return getContract(erc20Abi, address, web3)
}
export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(lpTokenAbi, address, web3)
}
export const getSouschefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract(sousChef, getAddress(config.contractAddress), web3)
}