export const API_TOKEN_MODEL = {
    entity: 'token',
    url: 'token/',
    methods: {

    },
}
export const API_USER_MODEL = {
    entity: 'user',
    url: 'user/',
    methods: {
        sendCode:{
            url: 'send-code/'
        },
        verifyCode:{
            url: 'verify-code/'
        },
        verifyEmployeeCode:{
            url: 'verify-employee-code/'
        },
        login:{
            url: 'login/'
        },
    },
}
export const API_LOGIN_MODEL = {
    entity: 'login',
    url: 'login/',
    methods: {
     
    },
}