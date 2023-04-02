<template>
    <div>
        <TypeNav></TypeNav>
        <container></container>
        <recommend></recommend>
        <rank></rank>
        <like></like>
        <floor v-for="floor in floors" :key="floor.id" :floor="floor"></floor>
        <brand></brand>
    </div>
</template>
<script>
    import Container from "./components/container";
    import Recommend from "./components/recommend";
    import Rank from "./components/rank";
    import Like from "./components/like";
    import Floor from "./components/floor";
    import Brand from "./components/brand";
    //辅助函数
    import { mapState } from "vuex";
    export default {
        components: { Container, Recommend, Rank, Like, Floor, Brand },
        name: "Home",
        data() {
            return {};
        },
        methods: {},
        computed: {
            //获取vuex中的数据
            ...mapState({
                floors: (state) => {
                    return state.home.floors;
                },
            }),
        },
        mounted() {
            //派发home模块事件，发送请求，获取floor数据
            this.$store.dispatch("home/getFloors");
        },
    };
</script>
<style scoped lang="less"></style>
