<template>
    <span
        @click="updateStatus" 
        :class="['d-block p-y-10 todo-list-item', { 'text-muted': task.done }]">
        {{task.title}}
    </span>
</template>

<script>
    export default {
        name: 'TodoListItem',
        props: ['task'],
        methods: {
            updateStatus() {
                // this.$firestore.collection('tasks').doc(this.task.id).update({
                //     done: !this.task.done
                // })
                this.$database.ref(`tasks/${this.task.id}`).update({
                    done: !this.task.done
                })
            }
        }
    }
</script>

<style lang="stylus">
    .text-muted
        text-decoration: line-through
        color: #cacaca !important

    .todo-list-item
        text-align: center
        color: #696969

        &:hover
            cursor: pointer
            color: #b1b1b1
</style>