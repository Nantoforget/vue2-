<template>
    <div>
        <Header></Header>
        <!-- 路由出口 -->
        <router-view></router-view>
        <!-- Footer有些页面不显示，要判断 -->
        <Footer v-show="$route.meta.isShow"></Footer>
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
    };
</script>
<style scoped></style>
