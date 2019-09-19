<template>
  <div class="d-flex p-y-10 p-x-20 todo-list-item">
    <span
      @click="updateStatus"
      :class="['d-flex todo-list-item-text', { 'text-muted': task.done }]"
    >{{task.title}}</span>

    <button @click="deleteItem" class="btn-delete p-y-10 p-x-15">
      <i class="fa fa-trash"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "TodoListItem",
  props: ["task"],
  methods: {
    updateStatus() {
      this.$firestore
        .collection("tasks")
        .doc(this.task.id)
        .update({
          done: !this.task.done
        });
    },
    deleteItem() {
      this.$firestore
        .collection("tasks")
        .doc(this.task.id)
        .delete();
    }
  }
};
</script>

<style lang="stylus">
.todo-list-item {
  justify-content: space-between;
}

.todo-list-item-text {
  align-items: center;
  color: #696969;

  &:hover {
    cursor: pointer;
    color: #b1b1b1;
  }
}

.text-muted {
  text-decoration: line-through;
  color: #cacaca !important;
}

.btn-delete {
  border: none;
  background-color: #dc3545;
  color: white;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
}
</style>