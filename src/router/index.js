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
            name: "search", //命名路由(一般与params参数结合使用)
            path: "/search/:keyword?", //params参数占位,?表示可传可不传
            component: Search,
            meta: { isShow: true },
            //props: true, // 布尔值写法：props:true()代表给路由传递props数据,传递的是params参数
            /* props: {
                name: "孙悟空",
            }, */ // 对象写法：props:{a:1,b:2},组件中可以直接使用props接受
            props: (route) => {
                /* 
                    函数写法：props:()=>{},当跳转到当前路由时，箭头函数会自动执行
                        第个参数是当前路由的对象route(类似$route)
                        return的就是传递的props,query和params参数都可以传递
                */
                return {
                    k1: route.params,
                    k2: route.query,
                };
            },
        },
        {
            path: "/",
            redirect: "/home",
        },
    ],
});
export default routers;
