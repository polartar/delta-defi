import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Action, Reducer, Store } from 'redux'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

export type Persistor = ReturnType<typeof persistStore>

function createStoreWithMiddleware<AppState, AnyAction extends Action>(
  rootReducer: Reducer<AppState>,
): { store: Store<AppState, AnyAction>; persistor: Persistor } {
  const persistConfig = {
    key: 'root',
    blacklist: ['header', 'toasts', 'pools'],
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })
  const persistor = persistStore(store)

  return {
    store: store as any,
    persistor,
  }
}

export { createStoreWithMiddleware }
