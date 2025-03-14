import axios from "axios";

export default {
    sendGetUserFavouritesRequest(userId) {
        return axios.get('/user-favourites', {
            params: {
                userId: userId,
            },
        });
    },
};