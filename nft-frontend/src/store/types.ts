import { ConnectorNames } from 'util/type'

export interface ToastsState {
  type: string,
  title: string,
  description?: string,
  call: boolean
}

export interface AccountState {
  accountAddress: string,
  active: boolean,
  chainId: string,
  connectorId: ConnectorNames,
}

export interface State {
  toasts: ToastsState,
}