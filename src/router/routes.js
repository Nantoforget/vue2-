//将路由配置分离出来
//引入一级路由組件
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Search from "@/pages/search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
//引入二级路由
import MyOrder from "@/pages/Center/MyOrder";
import TeamOrder from "@/pages/Center/TeamOrder";
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
        //交易页面
        name: "trade",
        path: "/trade",
        component: Trade,
        meta: { isShow: true },
    },
    {
        //订单页面(从交易页面提交订单)
        name: "pay",
        path: "/pay",
        component: Pay,
        meta: { isShow: true },
        beforeEnter: (to, from, next) => {
            //路由独享守卫
            //from.path == "/"是刷新
            if (from.name != "trade" && from.path != "/") {
                next(from);
            } else {
                next();
            }
        },
    },
    {
        //支付成功
        name: "paysuccess",
        path: "/paysuccess",
        component: PaySuccess,
        meta: { isShow: true },
        beforeEnter: (to, from, next) => {
            //路由独享守卫
            //from.path == "/"是刷新
            if (from.name != "pay" && from.path != "/") {
                next(from);
            } else {
                next();
            }
        },
    },
    {
        //个人中心
        name: "center",
        path: "/center",
        component: Center,
        meta: { isShow: false },
        children: [
            {
                //我的订单
                name: "myorder",
                path: "myorder",
                component: MyOrder,
            },
            {
                //团队订单
                name: "teamorder",
                path: "teamorder",
                component: TeamOrder,
            },
            {
                //重定向
                path: "/center",
                redirect: "myorder",
            },
        ],
    },
    {
        //重定向
        path: "/",
        redirect: "/home",
    },
];
