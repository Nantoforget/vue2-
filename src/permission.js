//路由守卫(写完后要在入口文件引入)
import router from "@/router";
import store from "@/store";
import { GET_TOKEN } from "@/utils/token";
//未登录不能访问的路由白名单
const whiteRouteList = ["trade", "pay", "center", "paysuccess", "myorder", "teamorder"];
//全局前置守卫
router.beforeEach(async (to, from, next) => {
    /* 
        to|from 路由对象
        to:你想要跳转过去的路由
        from:你从哪个路由来
        next:放行函数
     */
    const hasNickName = store.state.user.userInfo.nickName;
    if (GET_TOKEN()) {
        //如果有token，说明以登陆
        if (to.name == "login" || to.name == "register") {
            //如果登录状态去登录注册路由页面
            next(from); //回原路由页面
        } else {
            //如果登录状态不去登录注册路由页面，放行
            if (hasNickName) {
                //如果token在有效期内(则，有用户信息)
                next(); //要放行才能进入路由页面
            } else {
                try {
                    //如果from页面没有用户信息,重新发请求
                    await store.dispatch("user/getUserInfo");
                    next();
                } catch (error) {
                    //如果重新获取用户信息失败，说明token失效3
                    await store.dispatch("user/userLogout");
                    next(from);
                }
            }
        }
    } else {
        //未登录情况
        let toName = to.name;
        if (whiteRouteList.indexOf(toName) != -1) {
            //未登录要去一些特殊页面需要登录，登陆成功后再调回目标页面
            //利用不影响路由路径的query参数
            next({
                name: "login",
                query: {
                    redirect: to.name,
                },
            });
        } else {
            next(); //要放行才能进入路由页面
        }
    }
});
//全局后置首位
router.afterEach((to, from) => {});
