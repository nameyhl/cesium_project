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

    const role = ref("")
    const setRole = (val) => {
        role.value = val
    }
    const removeRole = () => {
        role.value = ""
    }

    const phone = ref("")
    const setPhone = (val) => {
        phone.value = val
    }
    const removePhone = () => {
        phone.value = ""
    }

    const msg = ref("")
    const setMsg = (val) => {
        msg.value = val
    }
    const removeMsg = () => {
        msg.value = ""
    }

    const password = ref("")
    const setPassword = (val) => {
        password.value = val
    }
    const removePassword = () => {
        password.value = ""
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
        removeId,
        role,
        setRole,
        removeRole,
        phone,
        setPhone,
        removePhone,
        msg,
        setMsg,
        removeMsg,
        password,
        setPassword,
        removePassword
    }
},{
    persist: true
})