import router from "@/router";

export default {
    navigateToUserHomeView() {
        router.push({locationName: 'userHomeRoute'})
    },
    // todo: see välja kommenteerida lõpus
    navigateToErrorView() {
        // router.push({name: 'errorRoute'})
    },

    navigateToAdminView() {
        router.push({locationName: 'adminHomeRoute'})
    },

    navigateToLoginView() {
        router.push({locationName: 'loginRoute'})
    },

    navigateToGameQuestionView(gameId) {
        router.push({
            locationName: 'gameQuestionsRoute',
            query: {
                gameId: gameId
            }
        })
        }
}