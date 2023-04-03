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
    import { mapState } from "vuex";
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
                //搜索请求的参数
                searchDate: {
                    category1Id: "",
                    category2Id: "",
                    category3Id: "",
                    categoryName: "",
                    keyword: "",
                    //综合价格，升序降序
                    order: "1:desc",
                    //第几页，有默认值
                    pageNo: 1,
                    //一页几条数据，有默认值
                    pageSize: 3,
                    props: [],
                    trademark: "",
                },
            };
        },
        methods: {
            //路由跳转携带的参数
            argument() {
                //路由的query参数
                this.searchDate.categoryName = this.$route.query.categoryName;
                this.searchDate.category1Id = this.$route.query.category1Id;
                this.searchDate.category2Id = this.$route.query.category2Id;
                this.searchDate.category3Id = this.$route.query.category3Id;
                //路由的params参数
                this.searchDate.keyword = this.$route.params.keyword;
                //选中的属性
                this.searchDate.props = this.props;
                //选中的品牌
                this.searchDate.trademark = this.trademarks;
            },
            //搜索请求函数
            getSearchList() {
                this.argument();
                this.$store.dispatch("search/getSearchList", this.searchDate);
            },
        },
        computed: {
            ...mapState("search", ["props", "trademarks"]),
        },
        watch: {
            //监视路由的变化
            $route: {
                handler() {
                    //路由变化，将query参数和params参数都作为参数发送请求
                    this.getSearchList();
                },
            },
            //监听属性变化
            props: {
                handler() {
                    //属性变化，重新发请求
                    this.getSearchList();
                },
            },
            //监听品牌变化
            trademarks: {
                handler() {
                    //品牌变化重新请求
                    this.getSearchList();
                },
            },
        },
        mounted() {
            //发请求
            this.getSearchList(this.searchDate);
            //利用全局事件总线自定义事件，当点击属性时发送请求
            this.$bus.$on("props", () => {
                this.getSearchList();
            });
            this.$bus.$on("addTrademark", () => {
                this.getSearchList();
            });
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
