import axios from "axios";

export default {
    sendCreateNewGameRequest(newGame) {
        return axios.post('/game', newGame);
    },

    sendSaveGameLocations(gameData) {
        return axios.post('/game-save', gameData);
    },
}