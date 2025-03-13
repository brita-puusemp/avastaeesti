import router from "@/router";

export default {
    navigateToUserHomeView() {
        router.push(
            {
                name: 'userHomeRoute'
            }
        )
    },
    // todo: see välja kommenteerida lõpus
    navigateToErrorView() {
        // router.push({name: 'errorRoute'})
    },

    navigateToAdminHomeView() {
        router.push({
                name: 'adminHomeRoute'
            }
        )
    },

    navigateToLoginView() {
        router.push({
                name: 'loginRoute'
            }
        )
    },

    navigateToLocationView(locationId) {
        router.push({
            name: 'locationRoute',
            query: {
                locationId: locationId
            }
        })
    },

    navigateToGameQuestionView(gameId) {
        router.push({
            name: 'gameQuestionsRoute',
            query: {
                gameId: gameId
            }
        })
    },

    navigateToGameView(randomGameId) {
        router.push({
            name: 'gameRoute',
            query: {
                randomGameId: randomGameId
            }
        })

    },

    navigateToResultView(userAnswerResult, randomGameId) {
        router.push({
            name: 'gameResultsRoute',
            query: {
                locationName: userAnswerResult.locationName ,
                locationIsCorrect: userAnswerResult.locationIsCorrect,
                totalQuestions: userAnswerResult.totalQuestions,
                questionsAnswered: userAnswerResult.questionsAnswered,
                randomGameId: randomGameId,

            }
        })
    },

    navigateToGameOverView(randomGameId) {
        router.push({
            name: 'gameOverRoute',
            query: {
                randomGameId: randomGameId
            }
        })

    },
}