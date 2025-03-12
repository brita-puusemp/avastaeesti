import axios from "axios";

export default {
    sendGetUserInfoRequest(userId) {
        return axios.get('/profile', {
                params: {
                    userId: userId
                }
            }
        )
    },
    sendPutUserUpdateRequest(User, userId) {
        return axios.put('/profile', User, {
                params: {
                    userId: userId
                }
            }
        )
    },
    sendDeleteUserInfoRequest(userId) {
        return axios.delete('/profile', {
                params: {
                    userId: userId
                }
            }
        )
    },
}