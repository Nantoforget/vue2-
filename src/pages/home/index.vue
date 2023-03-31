<template>
    <div>
        <TypeNav></TypeNav>
        <container></container>
        <recommend></recommend>
        <rank></rank>
        <like></like>
        <floor></floor>
        <floor></floor>
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
    export default {
        components: { Container, Recommend, Rank, Like, Floor, Brand },
        name: "Home",
        data() {
            return {};
        },
        methods: {},
        computed: {},
    };
</script>
<style scoped lang="less"></style>
