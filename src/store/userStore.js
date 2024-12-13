import { defineStore } from 'pinia';

export const userMainStore = defineStore('userMain', {
  state: () => ({
    user: {},
  }),
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
      let username = user.userName;
      let name = user.name;
      let phone = user.phone;
      localStorage.setItem('username', username);
      localStorage.setItem('name', name);
      localStorage.setItem('phone', phone);
    },
  },
});