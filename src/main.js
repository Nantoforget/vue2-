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
Vue.component(Footer.name, Footer);
Vue.component(Header.name, Header);
Vue.component(TypeNav.name, TypeNav);

//引入mockServe.js文件
import "@/mock/mockServe";
//引入swiper样式文件
import "swiper/css/swiper.css";

new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
