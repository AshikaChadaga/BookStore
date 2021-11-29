import axios from 'axios'

class AxiosService{
    postMethod(url, data, config){
        return axios.post(url, data, config);
    }
    getMethod(url, config){
        return axios.get(url, config);
    }
    deleteMethod(url, config){
        return axios.delete(url, config);
    }
    putMethod(url, data, config){
        return axios.put(url, data, config);
    }
}

export default AxiosService