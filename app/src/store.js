import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

const API_URL = "http://localhost:4000/api/todo";

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    todos(state) {
      return state.todos;
    }
  },
  mutations: {
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    SET_TODOS(state, todos) {
      state.todos = todos;
    }
  },
  actions: {
    getTodos(context) {
      Axios.get(API_URL)
        .then(res => {
          context.commit("SET_TODOS", res.data);
        })
        .catch(err => {
          alert("error occurred...");
          console.log(err);
        });
    },
    addTodo(context, todo) {
      Axios.post(API_URL, todo)
        .then(() => {
          context.commit("ADD_TODO", todo);
        })
        .catch(err => {
          alert("error occurred...");
          console.log(err);
        });
    }
  }
});
