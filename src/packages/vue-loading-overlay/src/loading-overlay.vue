<template>
    <transition name="fade">
        <div v-show="loading" class="loading-overlay">
            <div class="loader"></div>
        </div>
    </transition>
</template>

<script>

    export default {
        name: 'loading-overlay',
        props: {
            loading: Boolean
        }
    }

</script>

<style lang="stylus" scoped>
    .loading-overlay
        z-index: 9999
        cursor: wait
        position: fixed
        top: 0
        right: 0
        bottom: 0
        left: 0
        background-color: rgba(240, 240, 240, 0.6)
        display: flex
        justify-content: center
        align-items: center

        .loader
            border-radius: 50%
            width: 20px
            height: 20px
            border: 6px solid #F0151E
            border-bottom-color: rgba(240, 240, 240, 0.6)
            transform: translateZ(0)
            animation: loader-animation 1000ms infinite linear

            &:after
                border-radius: 50%
                width: 20px
                height: 20px

            @keyframes loader-animation
                0%
                    transform: rotate(0deg)

                100%
                    transform: rotate(360deg)

    .fade-enter-active
    .fade-leave-active
        transition: opacity 300ms

    .fade-enter
    .fade-leave-to
        opacity: 0
</style>