import { combineReducers } from 'redux'

import headerReducer from './modal'
import toastsReducer from './toasts'
import poolsReducer from './pools'
import account from './account'

const rootReducer = combineReducers({
  header: headerReducer,
  toasts: toastsReducer,
  pools: poolsReducer,
  account: account,
})

export { rootReducer }
