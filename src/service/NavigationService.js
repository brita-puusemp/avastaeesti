import router from "@/router";

export default {
    navigateToUserHomeView() {
        router.push({name: 'userHomeRoute'})
    },
    // todo: see välja kommenteerida lõpus
    navigateToErrorView() {
        // router.push({name: 'errorRoute'})
    },

    navigateToAdminView() {
        router.push({name: 'adminHomeRoute'})
    },

    navigateToLoginView() {
        router.push({name: 'loginRoute'})
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