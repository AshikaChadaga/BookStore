import { GET_CART_ITEMS, CART_ERROR, WISHLIST_ERROR, GET_WISHLIST_ITEMS } from '../types';
import UserService from '../../service/UserService';

const userService = new UserService();

export const getCartItems = (mode) => async dispatch => {

    try {
        const res = await userService.getCartList("/get_cart_items");
        
        dispatch({
            type: GET_CART_ITEMS,
            payload: res.data.result
        })
    }
    catch (e) {
        dispatch({
            type: CART_ERROR,
            payload: console.log(e),
        })
    }

}

export const getWishlistItems = () => async dispatch => {

    try {
        const res = await userService.getWishlistItems("/get_wishlist_items");
        let bookIdList = [];
        res.data.result.map(book => {
            bookIdList.push(book.product_id._id)
        })
        dispatch({
            type: GET_WISHLIST_ITEMS,
            payload: bookIdList
        })
    }
    catch (e) {
        dispatch({
            type: WISHLIST_ERROR,
            payload: console.log(e),
        })
    }

}
