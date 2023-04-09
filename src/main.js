import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
//路由VueRouter
import router from "@/router/index";
//状态管理Vuex
import store from "@/store/index";
//全局组件
import Footer from "@/components/footer";
import Header from "@/components/header";
import TypeNav from "@/components/typeNav";
import Pagination from "@/components/pagination";
Vue.component(Footer.name, Footer);
Vue.component(Header.name, Header);
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);

//引入mockServe.js文件,目的是让它运行
import "@/mock/mockServe";
//引入swiper样式文件
import "swiper/css/swiper.min.css";

//引入路由守卫文件
import "@/permission";
new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
