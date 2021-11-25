import { GET_CART_ITEMS, CART_ERROR, ADD_TO_BAG, ADD_BAG_ERROR } from '../types';
import UserService from '../../service/UserService';

const userService = new UserService();

export const getCartItems = () => async dispatch => {

    try {
        const res = await userService.getCartList("/get_cart_items");
        let bookIdList = [];
        res.data.result.map(book => {
            bookIdList.push(book.product_id._id)
        })
        dispatch({
            type: GET_CART_ITEMS,
            payload: bookIdList
        })
    }
    catch (e) {
        dispatch({
            type: CART_ERROR,
            payload: console.log(e),
        })
    }

}

export const addToBag = (book, getCartBooks) => async dispatch => {

    try {
        await userService.addToBag(`/add_cart_item/${book._id}`, {});
        dispatch({
            type: ADD_TO_BAG,
            payload: book._id
        })
        getCartBooks();
    }
    catch (e) {
        dispatch({
            type: ADD_BAG_ERROR,
            payload: console.log(e),
        })
    }

}

