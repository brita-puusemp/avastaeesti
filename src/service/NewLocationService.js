import axios from "axios";

export default {
    sendNewLocationPostRequest(newLocation) {
        return axios.post('/newLocation', newLocation)
    }
}