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

    },

    sendGetLocationPreviewRequest(locationId) {
        return axios.get('/location-preview', {
                params: {
                    locationId: locationId

                }
            }
        )
    },

    sendDeleteLocationRequest(locationId) {
        return axios.delete('/home-admin', {
                params: {
                    locationId: locationId
                }
            }
        )
    },
}


