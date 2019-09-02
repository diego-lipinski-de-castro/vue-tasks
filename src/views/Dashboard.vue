<template>
    <div class="d-flex d-flex-row m-a-20" style="justify-content: center">
        <todo-list 
            v-for="(todoList, index) in todoLists" 
            :title="todoList.title"
            :key="index"/>
    </div>
</template>

<script>
    import TodoList from '@/components/TodoList'

    export default {
        name: 'Dashboard',
        components: {
            TodoList
        },
        data() {
            return {
                todoLists: [
                    {
                        title: 'Tasks'
                    }
                ]
            }
        }
    }
</script>