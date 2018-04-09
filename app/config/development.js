export default {

    apiBaseUrl: 'http://localhost:8081/api',

    services : {
        analytics: {
            isOn : false
        },
        sentry: {
            isOn: false
        }
    },

    features: {
        memeSuggestions: false,
        saveUserMemeToStorage: true
    }



}