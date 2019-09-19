<template>
    <div class="d-flex m-a-20 dashboard-container">
        <div class="d-flex d-flex-row p-a-5 dashboard-container-inner">
            <todo-list 
                v-for="(tab, index) in tabs" 
                :tab="tab"
                :key="`${index}-${tab.id}`"/>

            <button @click="addTab" class="add-tab-button m-a-5"> Clique aqui para adicionar uma lista </button>
        </div>
    </div>
</template>

<script>
    import TodoList from '@/components/TodoList'
    import { mapGetters } from 'vuex' 

    export default {
        name: 'Dashboard',
        components: {
            TodoList
        },
        data() {
            return {
                tabs: []
            }
        },
        computed: {
            ...mapGetters('auth', [
                'user'
            ])
        },
        methods: {
            async getTabs() {
                const trace = this.$performance.trace('getTabsTrace');
                trace.start()
                await this.$firestore.collection('tabs').where('user', '==', this.user).orderBy('createdAt', 'asc')
                    .onSnapshot(snapshot => {
                        this.tabs = snapshot.docs.map(doc => {
                            return {
                                id: doc.id,
                                ...doc.data()
                            }
                        })
                    })
                trace.stop()
                trace.incrementMetric('numberOfUserTabs', this.tabs.length);
            },
            async addTab() {
                await this.$firestore.collection('tabs').add({
                    user: this.user,
                    title: `Tab ${this.tabs.length + 1}`,
                    color: '#009fff',
                    createdAt: Date.now(),
                    taskCount: 0
                })
            }
        },
        mounted() {
            this.getTabs()
        },
    }
</script>

<style lang="stylus">
    .dashboard-container
        background-color:white
        width: calc(100vw - 40px)
        height: calc(100vh - 40px)
        overflow-x: scroll
        box-shadow: 0px 0px 15px -5px rgba(100, 100, 100, 0.4)

        .add-tab-button
            border: 2px solid #009fff
            font-size: 20px
            color: #009fff
            min-width: 400px
            width: 400px

            &:hover
                cursor: pointer
                border-color #77ccff
                color: #77ccff
            
            &:focus
                outline: none
</style>