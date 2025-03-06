import axios from "axios";

export default {
    sendNewLocationPostRequest(newLocation) {
        return axios.post('/location', newLocation)
    },

    sendGetLocationsRequest() {
        return axios.get('/locations');
    },
}