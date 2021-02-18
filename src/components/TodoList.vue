<template>
    <div class="d-flex d-flex-column m-a-5 todo-list" :style="`background-color: ${tab.color}1A`">
        <span @click="openModal" class="block" :style="`background-color: ${tab.color}`"></span>

        <h1 class="d-flex m-a-0 p-a-20 todo-list-title" :style="`background-color: ${tab.color}`">
            <input class="input" type="text" v-model="tab.title" @focus="tab.title = ''" @blur="updateTabTitle">
            <small style="font-size: 20px;"> {{tab.taskCount}} </small>
        </h1>
        
        <!-- <sweet-modal :ref="`tab-watch-modal-${tab.id}`">
            <swatches v-model="tab.color" colors="basic" inline @input="updateTabColor"></swatches>    
        </sweet-modal> -->

        <button class="add-button p-a-10 m-b-20" :style="`background-color: ${tab.color}`" @click="addTask"> adicionar tarefa </button>
        
        <todo-list-item
            v-for="(task, index) in tasks"
            :task="task"
            :key="index"/>
    </div>
</template>

<script>
    import Swatches from 'vue-swatches'
    import "vue-swatches/dist/vue-swatches.css"

    // import { SweetModal } from 'sweet-modal-vue'

    import { mapGetters } from 'vuex'

    import TodoListItem from './TodoListItem'

    export default {
        name: 'TodoList',
        components: {
            Swatches,
            // SweetModal,
            TodoListItem
        },
        props: ['tab'],
        data() {
            return {
                tasks: []
            }
        },
        computed: {
            ...mapGetters('auth', [
                'user'
            ])
        },
        methods: {
            async getTasks() {
                await this.$firestore.collection('tasks').where('user', '==', this.user).where('tab', '==', this.tab.id).orderBy('createdAt', 'desc')
                    .onSnapshot(snapshot => {
                        this.tasks = snapshot.docs.map(doc => {
                            return {
                                id: doc.id,
                                ...doc.data()
                            }
                        })
                    })
            },
            async addTask() {
                await this.$firestore.collection('tasks').add({
                    user: this.user,
                    tab: this.tab.id,
                    title: `Task ${this.tasks.length + 1}`,
                    done: false,
                    createdAt: Date.now()
                })
            },
            async updateTabColor() {
                await this.$firestore.collection('tabs').doc(this.tab.id).update({
                    color: this.tab.color
                })

                this.$refs[`tab-watch-modal-${this.tab.id}`].close()
            },
            async updateTabTitle() {
                if(this.tab.title == '') {
                    const tab = await this.$firestore.collection('tabs').doc(this.tab.id).get()
                    this.tab.title = tab.data().title
                    return
                }
                await this.$firestore.collection('tabs').doc(this.tab.id).update({
                    title: this.tab.title
                })
            },
            openModal() {
                // this.$refs[`tab-watch-modal-${this.tab.id}`].open()
            }
        },
        mounted() {
            this.getTasks()
        },
    }
</script>

<style lang="stylus">
    .input
        border: none
        font-size: 34px
        color: white
        outline: none
        background-color: transparent
        text-align: center
        font-weight: bold
        width: 100%

    .block
        display: block
        margin-bottom: 2px
        width: 100%
        height: 15px

        &:hover
            cursor: pointer

    .todo-list
        overflow-y: scroll
        background-color: white
        min-width: 400px
        width: 400px
        position: relative

        &-title
            text-align: center
            background-color: red
            background-color: #009fff
            color: white
            font-size: 34px

            &:hover
                cursor: text

    .add-button
        margin-top: 2px
        border: 0
        font-size: 20px
        color: white
        background-color: #009fff

        &:hover
            cursor: pointer
        &:focus
            outline: none
</style>