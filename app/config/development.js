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

    admin: {
        isOn: true,
    },

    features: {
        memeSuggestions: false,
        saveUserMemeToStorage: true,
        showPreviewModal: true,
    }



}