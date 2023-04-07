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

//引入路由配置
import routes from "./routes";
//自定以路由实例
const routers = new VueRouter({
    mode: "hash",
    routes,
    // 路由滚动函数
    scrollBehavior(to, from, savePosition) {
        // console.log(to, from);
        //滚动条的位置
        return { y: 0 };
    },
});
export default routers;
