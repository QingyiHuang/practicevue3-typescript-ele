import { defineStore } from "pinia";
import Api from "@/api/user";
import type { ILoginparam } from "@/types/login";

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
        async changeUsers(obj: ILoginparam) {
            const res: any = await Api.login({
                username: obj.username,
                password: obj.password,
            })
            console.log(res)
            this.username = res.username
            this.token = res.token
        }
    }
})
export default useLoginStore