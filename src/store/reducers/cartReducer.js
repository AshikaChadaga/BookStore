import { GET_CART_ITEMS } from '../types';
import { ADD_TO_BAG } from '../types';

const initialState = {
    cartItems: []
}

export default function (state = initialState, action) {

    switch (action.type) {

        case GET_CART_ITEMS:
            return {
                cartItems: action.payload
            }
        case ADD_TO_BAG:
            return {
                ...state,
                cartItems: action.payload
            }
        default: return state
    }

}