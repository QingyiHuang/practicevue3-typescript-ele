import { defineStore } from "pinia";
import Api from "@/api/user";
type Tobj = {
    username: string,
    password: string
}
const useLoginStore = defineStore('login', {
    state: () => {
        return {
            username: '',
            token: ''
        }
    },
    getters: {
        getUsername(state) {
            return state.username
        }
    },
    actions: {
        changeUsers(obj: Tobj) {

            Api.login({
                username: obj.username,
                password: obj.password,
            })
                .then((res: any) => {
                    console.log(res)
                    this.username = res.username
                    this.token = res.token
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
})
export default useLoginStore