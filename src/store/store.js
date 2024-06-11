
// store/modules/auth.js
const state = {
    isAuthenticated: false,
  };
  
  const mutations = {
    SET_AUTH(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  };
  
  const actions = {
    login({ commit }) {
      // Logic to log in
      commit('SET_AUTH', true);
    },
    logout({ commit }) {
      // Logic to log out
      commit('SET_AUTH', false);
    },
  };
  
  const getters = {
    isAuthenticated: (state) => state.isAuthenticated,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  