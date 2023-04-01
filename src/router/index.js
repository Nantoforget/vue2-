import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

//重写push方法
//先备份
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
//重写,location是编程式导航的第一个参：数{name: "search",params: {keyword: this.keyword || undefined,},},
VueRouter.prototype.push = function (location, resolve, reject) {
    //当有成功或错误的返回
    if (resolve || reject) {
        //需要保证push方法的this指向$router
        originPush.call(this, location, resolve, reject); //不返会是因为返回的是undefined
    } else {
        //没有传递成功或失败的回调，自己手写一个
        return originPush.call(this, location).catch(() => {});
    }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
    //当有成功或错误的返回
    if (resolve || reject) {
        //需要保证push方法的this指向$router
        originReplace.call(this, location, resolve, reject); //不返会是因为返回的是undefined
    } else {
        //没有传递成功或失败的回调，自己手写一个
        return originReplace.call(this, location).catch(() => {
            console.log(err);
        });
    }
};

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
            name: "home",
            path: "/home",
            component: Home,
            meta: { isShow: true }, //路由元信息：给当前路由注入一些额外的信息；必须是meta，只可以任意类型
        },
        {
            name: "login",
            path: "/login",
            component: Login,
            meta: { isShow: false },
        },
        {
            name: "register",
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
