import React, { useState, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { AnyAction, Store } from 'redux'
import { CssBaseline } from '@material-ui/core'
import { StylesProvider } from '@material-ui/styles';
import { Web3ReactProvider } from '@web3-react/core'
import { PersistGate } from 'redux-persist/integration/react'

import { ThemeContextProvider } from 'contexts/ThemeContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'

import { getLibrary } from 'util/web3React'

import { Persistor, createStoreWithMiddleware } from './store';
import { AppState } from './store/AppState'
import { rootReducer } from './store/rootReducer'

const Providers: React.FC = ({ children }) => {
  const [store, setStore] = useState<Store | undefined>(undefined)
  const [persistor, setPersistor] = useState<Persistor | undefined>(undefined)

  useEffect(() => {
    const { store, persistor } = createStoreWithMiddleware<AppState, AnyAction>(rootReducer)
    setStore(store)
    setPersistor(persistor)
  }, [])

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <CssBaseline />
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
                <StylesProvider injectFirst>
                  <RefreshContextProvider>
                    {children}
                  </RefreshContextProvider>
                </StylesProvider>  
              </ThemeContextProvider>
            </HelmetProvider>
          </PersistGate>
        </Provider>
      )}
    </Web3ReactProvider>
  )
}

export default Providers
