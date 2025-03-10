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

    navigateToAdminView() {
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

    navigateToGameView(gameId) {
        router.push({
            name: 'gameRoute',
            query: {
                gameId: gameId
            }
        })

    },
}