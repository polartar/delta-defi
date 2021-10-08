import { combineReducers } from 'redux'

import toastsReducer from './toasts'
import account from './account'

const rootReducer = combineReducers({
  toasts: toastsReducer,
  account: account,
})

export { rootReducer }
