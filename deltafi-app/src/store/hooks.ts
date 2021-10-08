import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useASelector } from './recipies.util'

import {
  setHeaderOpen,
  setDepositOpen,
  setStakeOpen,
  setMenuOpen,
  setSettingOpen,
  push as pushToast,
  useConfigAction,
} from './actions'

// Modal

export const useModal = () => {
  const { headerOpen, depositOpen, stakeOpen, menuOpen, settingOpen, depositPid, stakePid } = useSelector((state: any) => state.header)
  return { headerOpen, depositOpen, stakeOpen, menuOpen, settingOpen, depositPid, stakePid }
}

export const useAccount = () => {
  const account = useASelector((state) => state.account, [])
  const isConnectedWallet = account.active
  const setAccount = useConfigAction('setAccount')
  const removeAccount = useConfigAction('removeAccount')

  return { account, isConnectedWallet, setAccount, removeAccount }
}

export const useFetchModal = () => {
  const dispatch = useDispatch()
  const helpers = useMemo(() => {
    return {
      setHeaderOpen: (open: boolean) => dispatch(setHeaderOpen(open)),
      setSettingOpen: (open: boolean) => dispatch(setSettingOpen(open)),
      setDepositOpen: (open: boolean, pid: number) => dispatch(setDepositOpen({open, pid})),
      setStakeOpen: (open: boolean, pid: number) => dispatch(setStakeOpen({open, pid})),
      setMenuOpen: (open: boolean) => dispatch(setMenuOpen(open)),
    }
  }, [dispatch])

  return helpers
}

// Toasts
export const useToast = () => {
  const dispatch = useDispatch()
  const helpers = useMemo(() => {
    const push = (toast: any) => dispatch(pushToast(toast))

    return {
      toastError: (title: string, description?: string) => {
        return push({ type: 'Error', title, description })
      },
      toastInfo: (title: string, description?: string) => {
        return push({ type: 'Info', title, description })
      },
      toastSuccess: (title: string, description?: string) => {
        return push({ type: 'Success', title, description })
      },
      toastWarning: (title: string, description?: string) => {
        return push({ type: 'Warning', title, description })
      },
      push
    }
  }, [dispatch])

  return helpers
}