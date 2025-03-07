import axios from "axios";

export default {
    sendNewLocationPostRequest(newLocation) {
        return axios.post('/location', newLocation)
    },

    sendGetLocationsRequest() {
        return axios.get('/locations');
    },

    sendGetLocationPreviewRequest(locationId) {
        return axios.get('/location-preview', {
                params: {
                    locationId: locationId

                }
            }
        )
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
