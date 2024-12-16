import { defineStore } from 'pinia'

const useUserInfoStore = defineStore("userInfo", () => {
    const token = ref("")
    const setToken = (token) => {
        token.value = token
    }
    const removeToken = () => {
        token.value = ""
    }

    const username = ref("")

    const setUsername = (username) => {
        username.value = username
    }

    const removeUserName = () => {
        username.value = ""
    }

    return {
        token,
        setToken,
        removeToken,
        username,
        setUsername,
        removeUserName
    }

})

export default useUserInfoStore