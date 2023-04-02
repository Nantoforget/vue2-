<template>
    <div>
        <TypeNav></TypeNav>
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <Bread></Bread>
                <!--selector-->
                <SearchSelector />
                <!-- details -->
                <Details></Details>
            </div>
        </div>
    </div>
</template>
<script>
    import Bread from "./components/bread.vue";
    import Details from "./components/details.vue";
    import SearchSelector from "./components/searchSelector.vue";
    export default {
        //路由传递的props
        // props: ["name"],
        name: "Search",
        components: {
            Bread,
            Details,
            SearchSelector,
        },
        data() {
            return {
                name: "",
                c1Id: 0,
            };
        },
        methods: {
            //搜索请求函数
            getSearchList(params) {
                // console.log(params);
                this.$store.dispatch("search/getSearch");
            },
        },
        computed: {},
        mounted() {
            this.name = this.$route.query.categoryName;
            this.c1Id = this.$route.query.category1Id;
            // console.log(this.$route);
            this.getSearchList(this.$route);
        },
    };
</script>

<style scoped lang="less">
    .main {
        margin: 10px 0;

        .py-container {
            width: 1200px;
            margin: 0 auto;
        }
    }
</style>
