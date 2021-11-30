class Authentication {
    constructor(props) {
        if (localStorage.getItem("id"))
            this.authenticated = true;
        else
            this.authenticated = false;

    }
    login(callback) {
        if (localStorage.getItem("id")){
            this.authenticated = true;
            callback();
        }

    }
    logout() {
        this.authenticated = false;
    }
    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Authentication();

