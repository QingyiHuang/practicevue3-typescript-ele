import http from './httpinstance'
interface IloginParam {
    username: string
    password: string
}
const login = (data: IloginParam) => {
    return http.post('/api/user/login', {
        data
    })
}
export default {
    login
}