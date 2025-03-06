import axios from "axios";

export default {
    sendCreateNewGameRequest(newGame) {
        return axios.post('/game', newGame);
    },
}