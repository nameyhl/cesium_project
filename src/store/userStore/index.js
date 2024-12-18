import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserInfoStore = defineStore("userInfo", () => {
    const token = ref("")
    const setToken = (val) => {
        token.value = val
    }
    const removeToken = () => {
        token.value = ""
    }

    const username = ref("")
    const setUsername = (val) => {
        username.value = val
    }
    const removeUserName = () => {
        username.value = ""
    }

    const name = ref("")
    const setName = (val) => {
        name.value = val
    }
    const removeName = () => {
        name.value = ""
    }

    const imgUrl = ref("")
    const setImgUrl = (val) => {
        imgUrl.value = val
    }
    const removeImgUrl = () => {
        imgUrl.value = ""
    }

    const id = ref("")
    const setId = (val) => {
        id.value = val
    }
    const removeId = () => {
        id.value = ""
    }

    return {
        token,
        setToken,
        removeToken,
        username,
        setUsername,
        removeUserName,
        name,
        setName,
        removeName,
        imgUrl,
        setImgUrl,
        removeImgUrl,
        id,
        setId,
        removeId
    }
},{
    persist: true
})