import { defineStore } from "pinia";
import { reactive } from "vue";

export const useUserStore = defineStore("user", () => {
    const user = reactive("");
   
    const setUser = (user) => {
        user.user = user;
    }
    return { user, setUser };
})