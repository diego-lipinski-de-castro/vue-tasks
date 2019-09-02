<template>
    <div class="d-flex d-flex-column todo-list p-a-50">
        <h1 class="m-a-0 m-b-50 todo-list-title">{{title}}</h1>

        <span v-if="tasks.length == 0" class="d-block" style="text-align: center;">No tasks today!</span>
        
        <todo-list-item
            v-else
            v-for="(task, index) in tasks"
            :task="task"
            :key="index"/>

        <button class="add-button m-t-50 p-a-10" @click="addTask"> Adicionar </button>
    </div>
</template>

<script>
    import TodoListItem from './TodoListItem'

    export default {
        name: 'TodoList',
        components: {
            TodoListItem
        },
        props: {
            title: {
                type: String
            }
        },
        mounted() {
            this.getTasks()
            // for(let i = 0; i < 2000; i++) {
            //     this.addTask()        
            // }
        },
        data() {
            return {
                tasks: [
                ]
            }
        },
        methods: {
            async getTasks() {
                // await this.$firestore.collection('tasks').orderBy('createdAt', 'desc')
                //     .onSnapshot(snapshot => {
                //         this.tasks = snapshot.docs.map(doc => {
                //             return {
                //                 id: doc.id,
                //                 ...doc.data()
                //             }
                //         })
                //     })
                this.$database.ref('tasks').on('value', snapshot => {
                    this.tasks = []
                    snapshot.forEach(doc => {
                        this.tasks.push({
                            id: doc.key,
                            ...doc.val()
                        })
                    })
                })
            },
            async addTask() {
                // await this.$firestore.collection('tasks').add({
                    // title: `Task ${this.tasks.length + 1}`,
                    // done: false,
                    // createdAt: Date.now()
                // })
                await this.$database.ref('tasks').push({
                    title: `Task ${this.tasks.length + 1}`,
                    done: false,
                    createdAt: Date.now()
                })
            }
        }
    }
</script>

<style lang="stylus">
    .todo-list
        background-color: white
        min-width: 400px

        &-title
            text-align: center

    .add-button
        border: 0
        font-size: 20px
        color: white
        background-color: #009fff

        &:hover
            cursor: pointer
        &:focus
            outline: none
</style>