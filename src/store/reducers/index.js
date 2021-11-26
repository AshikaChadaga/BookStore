import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import wishlistReducer from './wishlistReducer'

export default combineReducers({
  cartItems: cartReducer,
  wishlistItems: wishlistReducer
})