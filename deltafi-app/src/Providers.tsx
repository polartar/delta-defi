import React, { useState, useEffect, useMemo } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { AnyAction, Store } from 'redux'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolflareWebWallet,
  getSolletExtensionWallet,
  getSolletWallet,
  getTorusWallet,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { PersistGate } from 'redux-persist/integration/react'

import { ThemeContextProvider } from 'contexts/ThemeContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'

import { Persistor, createStoreWithMiddleware } from './store';
import { AppState } from './store/AppState'
import { rootReducer } from './store/rootReducer'

const Providers: React.FC = ({ children }) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;
  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [
    getPhantomWallet(),
    getSlopeWallet(),
    getSolflareWallet(),
    getSolflareWebWallet({ network }),
    getTorusWallet({
        options: { clientId: 'Get a client ID @ https://developer.tor.us' }
    }),
    getLedgerWallet(),
    getSolletWallet({ network }),
    getSolletExtensionWallet({ network }),
  ], [network]);
  const [store, setStore] = useState<Store | undefined>(undefined)
  const [persistor, setPersistor] = useState<Persistor | undefined>(undefined)

  useEffect(() => {
    const { store, persistor } = createStoreWithMiddleware<AppState, AnyAction>(rootReducer)
    setStore(store)
    setPersistor(persistor)
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
      {store === undefined || persistor === undefined ? (
        <></>
      ) : (
        <Provider store={store}>
          <PersistGate
            persistor={persistor}
            loading={<div>Loading Persist</div>}
          >
            <HelmetProvider>
              <ThemeContextProvider>
                <RefreshContextProvider>
                  {children}
                </RefreshContextProvider>
              </ThemeContextProvider>
            </HelmetProvider>
          </PersistGate>
        </Provider>
      )}
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default Providers
