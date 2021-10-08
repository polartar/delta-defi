/* eslint-disable no-await-in-loop */
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

export const approve = async (lpContract, contract, account) => {
  return lpContract.methods
    .approve(contract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const stake = async (contract, pid, amount, account) => {

  return contract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, gas: 200000 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (contract, pid, amount, account) => {
  return contract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, gas: 200000 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}