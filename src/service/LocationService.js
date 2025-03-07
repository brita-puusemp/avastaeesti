import axios from "axios";

export default {
    sendNewLocationPostRequest(newLocation) {
        return axios.post('/location', newLocation)
    },

    sendGetLocationsRequest() {
        return axios.get('/locations');
    },

    sendPutLocationRequest(location, locationId) {
        return axios.put('/location', location, {
                params: {
                    locationId: locationId
                }
            }
        )
    },

    sendGetLocationRequest(locationId) {
        return axios.get('/location', {
                params: {
                    locationId: locationId,
                }
            }
        )

    }
}


