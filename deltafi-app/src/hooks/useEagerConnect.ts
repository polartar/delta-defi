import { useEffect } from 'react'
import useAuth from 'hooks/useAuth'
import { useAccount } from 'store/hooks';

const useEagerConnect = () => {
  const { account } = useAccount()
  const { login } = useAuth()

  useEffect(() => {
    // Disable eager connect for BSC Wallet. Currently the BSC Wallet extension does not inject BinanceChain
    // into the Window object in time causing it to throw an error
    // TODO: Figure out an elegant way to listen for when the BinanceChain object is ready
    login(account.connectorId)
  }, [login, account.connectorId])
}

export default useEagerConnect
