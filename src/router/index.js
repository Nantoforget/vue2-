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
        },
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/register",
            component: Register,
        },
        {
            path: "/search",
            component: Search,
        },
        {
            path: "/",
            redirect: "/home",
        },
    ],
});
export default routers;
