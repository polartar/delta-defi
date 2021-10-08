import { PoolConfig } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { ConnectorNames } from 'util/type'

export interface Pool extends PoolConfig {
  totalStaked?: BigNumber
  PoolStaked?: BigNumber
  startBlock?: number
  endBlock?: number
  lockBlock?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
}
export interface ModalState {
  headerOpen: boolean,
  settingOpen: boolean,
  stakeOpen: boolean,
  depositOpen: boolean,
  menuOpen: boolean,
  depositPid: number,
  stakePid: number,
}

export interface ToastsState {
  type: string,
  title: string,
  description?: string,
  call: boolean
}

export interface PoolsState {
  data: Pool[]
}

export interface AccountState {
  accountAddress: string,
  active: boolean,
  chainId: string,
  connectorId: ConnectorNames,
}

export interface State {
  modal: ModalState,
  toasts: ToastsState,
  pools: PoolsState
}