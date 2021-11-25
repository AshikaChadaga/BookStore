import AxiosService from "./AxiosService"

const axiosService = new AxiosService();
let config = {
    headers: {
        'x-access-token': localStorage.getItem("id"),
    }
};
let baseURL = "https://new-bookstore-backend.herokuapp.com/bookstore_user";


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
}
export default UserService