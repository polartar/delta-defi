import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useASelector } from './recipies.util'

import {
  push as pushToast,
  useConfigAction,
} from './actions'

export const useAccount = () => {
  const account = useASelector((state) => state.account, [])
  const isConnectedWallet = account.active
  const setAccount = useConfigAction('setAccount')
  const removeAccount = useConfigAction('removeAccount')

  return { account, isConnectedWallet, setAccount, removeAccount }
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