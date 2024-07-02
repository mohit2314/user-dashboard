import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    userDetails: null,
    userPosts: [],
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUserDetails(state, userDetails) {
      state.userDetails = userDetails;
    },
    setUserPosts(state, userPosts) {
      state.userPosts = userPosts;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      commit('setUsers', response.data);
    },
    async fetchUserDetails({ commit }, id) {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      commit('setUserDetails', response.data);
    },
    async fetchUserPosts({ commit }, id) {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
      commit('setUserPosts', response.data);
    },
  },
  modules: {},
});