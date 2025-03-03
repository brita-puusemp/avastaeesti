import axios from "axios";

export default {
    getLogin(username, password) {
        return axios.get('/login', {
                params: {
                    username: username,
                    password: password
                }
            }
        );
    },
}