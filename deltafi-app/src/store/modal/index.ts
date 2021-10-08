/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { ModalState } from '../types'

const initialState: ModalState = { 
  headerOpen: false,
  depositOpen: false,
  depositPid: 0,
  stakeOpen: false,
  stakePid: 0,
  menuOpen: false,
  settingOpen: false,
}

export const modalSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    setHeaderOpen: (state, action) => {
      state.headerOpen = action.payload

      state.depositOpen = false
      state.stakeOpen = false
      state.menuOpen = false
      state.settingOpen = false
      state.depositPid = 0
      state.stakePid = 0
    },
    setStakeOpen: (state, action) => {
      state.stakeOpen = action.payload.open
      state.stakePid = action.payload.pid

      state.depositOpen = false
      state.headerOpen = false
      state.menuOpen = false
      state.settingOpen = false
      state.depositPid = 0
    },
    setDepositOpen: (state, action) => {
      state.depositOpen = action.payload.open
      state.depositPid = action.payload.pid

      state.headerOpen = false
      state.stakeOpen = false
      state.menuOpen = false
      state.settingOpen = false
      state.stakePid = 0
    },
    setMenuOpen: (state, action) => {
      state.menuOpen = action.payload

      state.depositOpen = false
      state.stakeOpen = false
      state.headerOpen = false
      state.settingOpen = false
      state.depositPid = 0
      state.stakePid = 0
    },
    setSettingOpen: (state, action) => {
      state.settingOpen = action.payload

      state.depositOpen = false
      state.stakeOpen = false
      state.headerOpen = false
      state.menuOpen = false
      state.depositPid = 0
      state.stakePid = 0
    },
  },
})

// Actions
export const { setHeaderOpen, setStakeOpen, setDepositOpen, setMenuOpen, setSettingOpen } = modalSlice.actions

export default modalSlice.reducer
