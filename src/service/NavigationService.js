import router from "@/router";

export default {
    navigateToUserHomeView() {
        router.push({gameName: 'userHomeRoute'})
    },
    // todo: see välja kommenteerida lõpus
    navigateToErrorView() {
        // router.push({name: 'errorRoute'})
    },

    navigateToAdminView() {
        router.push({gameName: 'adminHomeRoute'})
    },

    navigateToLoginView() {
        router.push({gameName: 'loginRoute'})
    },

    navigateToGameQuestionView(gameId) {
        router.push({
            name: 'gameQuestionsRoute',
            query: {
                gameId: gameId
            }
        })
        }
}