//将路由配置分离出来
//引入路由組件
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Search from "@/pages/search";
//详情页
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
export default [
    {
        name: "home",
        path: "/home",
        component: Home,
        //isShow表示footer组件是否显示
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
        //详情路由
        name: "detail",
        path: "/detail/:skuId",
        component: Detail,
        meta: { isShow: true }, //路由元信息，判断头尾是否显示
    },
    //加入购物车成功
    {
        name: "addcartsuccess",
        path: "/addcartsuccess",
        component: AddCartSuccess,
        meta: { isShow: true },
    },
    {
        //购物车路由
        name: "shopcart",
        path: "/shopcart",
        component: ShopCart,
        meta: { isShow: true },
    },
    {
        path: "/",
        redirect: "/home",
    },
];
