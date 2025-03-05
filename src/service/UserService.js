import axios from "axios";

export default {
    sendPostRegisterRequest(newUser) {
        return axios.post('/user', newUser);
    },
}