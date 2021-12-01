import AxiosService from "./AxiosService"

const axiosService = new AxiosService();
let config = {
    headers: {
        'x-access-token': localStorage.getItem("id"),
    }
};
let baseURL = "https://bookstore.incubation.bridgelabz.com/bookstore_user";


class UserService {
    registration(url, data) {
        return axiosService.postMethod(`${baseURL}${url}`, data);
    }
    login(url, data) {
        return axiosService.postMethod(`${baseURL}${url}`, data);
    }
    getBooks(url) {
        return axiosService.getMethod(`${baseURL}${url}`, config);
    }
    addToBag(url, data) {
        return axiosService.postMethod(`${baseURL}${url}`, data, config);
    }
    addToWishlist(url, data) {
        return axiosService.postMethod(`${baseURL}${url}`, data, config);
    }
    getCartList(url) {
        return axiosService.getMethod(`${baseURL}${url}`, config);
    }
    getWishlistItems(url) {
        return axiosService.getMethod(`${baseURL}${url}`, config);
    }
    deleteCartItem(url){
        return axiosService.deleteMethod(`${baseURL}${url}`, config);
    }
    deleteWishlistItem(url){
        return axiosService.deleteMethod(`${baseURL}${url}`, config);
    }
    updateQuantity(url, data){
        return axiosService.putMethod(`${baseURL}${url}`, data, config);
    }
    updateDetails(url, data){
        return axiosService.putMethod(`${baseURL}${url}`, data, config);
    }
    placeOrder(url, data) {
        return axiosService.postMethod(`${baseURL}${url}`, data, config);
    }
}
export default UserService