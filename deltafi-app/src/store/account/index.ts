/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { AccountState } from '../types'
import { makeActionHook } from '../recipies.util'
import { ConnectorNames } from 'util/type'

const initialState: AccountState = { 
  accountAddress: null,
  active: false,
  chainId: '',
  connectorId: ConnectorNames.Injected,
}

export const accountSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      const { account, active, chainId } = action.payload
      state.accountAddress = account
      state.active = active
      state.chainId = chainId
    },
    removeAccount: (state) => {
      state.accountAddress = null
      state.active = false
      state.chainId = ''
      state.connectorId = ConnectorNames.Injected
    }
  },
})

// Actions
export const accountActions = accountSlice.actions
export const useConfigAction = makeActionHook(accountActions)

export default accountSlice.reducer
