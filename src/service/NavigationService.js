import router from "@/router";

export default {
     navigateToUserHomeView() {
         router.push({name: 'userHome'})
     },

    navigateToErrorView() {
         // router.push({name: 'error'})
    },
 }