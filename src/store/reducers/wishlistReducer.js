import { GET_WISHLIST_ITEMS } from '../types';

const initialState = {
    wishlistItems: []
}

export default function (state = initialState, action) {

    switch (action.type) {

        case GET_WISHLIST_ITEMS:
            return {
                wishlistItems: action.payload
            }
        default: return state
    }

}