import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);
//引入路由組件
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Search from "@/pages/search";
//自定以路由实例
const routers = new VueRouter({
    mode: "hash",
    routes: [
        {
            path: "/home",
            component: Home,
            meta: { isShow: true }, //路由元信息：给当前路由注入一些额外的信息；必须是meta，只可以任意类型
        },
        {
            path: "/login",
            component: Login,
            meta: { isShow: false },
        },
        {
            path: "/register",
            component: Register,
            meta: { isShow: false },
        },
        {
            path: "/search",
            component: Search,
            meta: { isShow: true },
        },
        {
            path: "/",
            redirect: "/home",
        },
    ],
});
export default routers;
