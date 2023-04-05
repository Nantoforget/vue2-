<template>
    <div>
        <!-- <Header></Header> -->
        <!-- 路由出口 -->
        <!-- <router-view></router-view> -->
        <!-- Footer有些页面不显示，要判断 -->
        <!-- <Footer v-show="$route.meta.isShow"></Footer> -->
        <!--total总条数     pageSize每页显示几条数据  pageNo显示第几页   pager中间连续现实的页数几个 -->
        <Pagination
            :total="100"
            :pageSize="3"
            :pageNo="6"
            :pager="7"></Pagination>
    </div>
</template>
<script>
    /* 
        不管是路由组件还是非路由组件，都有$route和$router属性
        $route路由属性：可以看到query参数、params参数和路径等单个的属性
        $router路由器属性：进行编程式导航， push|replace
    */
    export default {
        name: "App",
        data() {
            return {};
        },
        methods: {},
        computed: {},
        mounted() {
            //请求次数优化，因为App组件不会被重新创建,所以数据一直存在
            //提交到home模块的actions
            this.$store.dispatch("home/getCategory");
        },
    };
</script>
<style scoped></style>
