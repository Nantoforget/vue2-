<template>
    <div>
        <h1>我是搜索</h1>
        <h2>{{ name }}</h2>
        <h3>{{ c1Id }}</h3>
    </div>
</template>
<script>
    export default {
        //路由传递的props
        // props: ["name"],
        name: "Search",
        data() {
            return {
                name: "",
                c1Id: 0,
            };
        },
        methods: {},
        computed: {},
        mounted() {
            this.name = this.$route.query.categoryName;
            this.c1Id = this.$route.query.category1Id;
        },
    };
</script>
<style scoped></style>
