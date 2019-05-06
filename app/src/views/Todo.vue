<template>
  <div class="todo">
    <div>
      <input class="input is-small" type="text" v-model="todo.name" />
      <button class="button is-primary" @click="createTodo">Add</button>
    </div>
    <div v-for="(todo, index) in todos" :key="index">
      {{ todo.name }}
    </div>
  </div>
</template>

<script>
import { mapState, /* mapGetters, */ mapActions } from "vuex";

export default {
  data() {
    return {
      todo: {
        name: "",
        done: false
      }
    };
  },
  created() {
    this.getTodos();
  },
  computed: {
    // ...mapGetters(["todos"])
    ...mapState(["todos"])
  },
  methods: {
    ...mapActions(["addTodo", "getTodos"]),
    createTodo() {
      this.addTodo(this.todo);
      this.todo = {
        name: "",
        done: false
      };
    }
  }
};
</script>
