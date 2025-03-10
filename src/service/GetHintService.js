import axios from "axios";

export default {
    sendGetHintRequest(id) {
        return axios.get(`/gethint/${id}`);
    },
};
