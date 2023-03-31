import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import router from "@/router/index";

import store from "@/store/index";

new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
