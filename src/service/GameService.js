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

    sendGetUserGames(userId) {
        return axios.get('/user-games',
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

    },

    sendGetGameOverResultsRequest(randomGameId) {
        return axios.get('/game/gameover', {
                params: {
                    randomGameId: randomGameId,
                }
            }
        );
    },

    sendPostNewLocationToUserGame(gameId, selectedLocationId) {
        return axios.post('/game-location', null, {
                params: {
                    gameId: gameId,
                    locationId: selectedLocationId
                }
            }
        )
    },

    sendDeleteGameLocationRequest(gameLocationId) {
        return axios.delete('/game-location', {
                params: {
                    gameLocationId: gameLocationId
                }
            }
        )
    },
    sendUserGameDeleteRequest(gameId) {
        return axios.delete('/user-game', {
                params: {
                    gameId: gameId
                }
            }
        )
    },
}