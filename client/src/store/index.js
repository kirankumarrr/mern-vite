import { createApp } from "vue";
import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      count: 0,
      cards: [],
    };
  },
  mutations,
  actions,
  getters,
});
export default store;
