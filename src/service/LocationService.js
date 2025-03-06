import axios from "axios";

export default {
    sendNewLocationPostRequest(newLocation) {
        return axios.post('/location', newLocation)
    },

    sendGetLocationsRequest() {
        return axios.get('/locations');
    },

    sendPutLocationRequest(location, questionId) {
        return axios.put('/location',location, {
                params: {
                    location: location,
                    questionId: questionId
                }
            }
        )
    },

}
