import axios from "axios";

export default {
    sendCreateNewGameRequest(newGame) {
        return axios.post('/game', newGame);
    },

    sendSaveGameLocations(gameData) {
        return axios.post('/game-save', gameData);
    },

    sendGetGamesRequest() {
        return axios.get('/games');
    },

    sendPostNewRandomGame(userId) {
        return axios.post('/random/game', null,
        {
            params: {
                userId: userId
            }
        });
    },

    sendGetRandomGameLocationsRequest(randomGameId) {
        return axios.get('/random/game/location', {
                params: {
                    randomGameId: randomGameId,
                }
            }
        );
    },

    sendPostUserAnswerRequest(userAnswer) {
        return axios.post('/game/location/result', userAnswer);

    }

}