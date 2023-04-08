import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

//引入小仓库
import home from "./home";
import search from "./search";
import user from "./user";
import detail from "./detail";
import shopcart from "./shopcart";
//最大的仓库
const stores = new Vuex.Store({
    //注册小仓库
    modules: {
        home,
        search,
        user,
        detail,
        shopcart,
    },
});
export default stores;
