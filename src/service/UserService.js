import AxiosService from "./AxiosService"

const axiosService = new AxiosService();
let baseURL = "https://new-bookstore-backend.herokuapp.com/bookstore_user";


class UserService {
    registration(url, data) {
        return axiosService.postMethod(`${baseURL}${url}`, data);
    }
    login(url, data) {
        return axiosService.postMethod(`${baseURL}${url}`, data);
    }
}

export default UserService