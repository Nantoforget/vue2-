<template>
    <div>
        <h1>我是搜索</h1>
        <h2>{{ keyword }}</h2>
        <h3>{{ name }}</h3>
    </div>
</template>
<script>
    export default {
        //路由传递的props
        props: ["name"],
        name: "Search",
        data() {
            return {
                keyword: "",
            };
        },
        methods: {},
        computed: {},
        mounted() {
            this.keyword = this.$route.params.keyword;
        },
    };
</script>
<style scoped></style>
