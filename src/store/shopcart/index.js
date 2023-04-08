//shopcart模块的小仓库---state,actions,mutations,getters
import { getCartList } from "@/api";
//存储数据
const state = {
    //购物车数据
    cartList: [],
};
//异步
const actions = {
    //获取购物车数据
    async getCartList({ state, commit, dispatch }) {
        let result = await getCartList();
        if (result.code == 200) {
            commit("GETCARTLIST", result.data);
        }
    },
};
//修改数据
const mutations = {
    //获取购物车数据后保存
    GETCARTLIST(state, data) {
        state.cartList = data;
    },
};
//计算属性
const getters = {};

//对外暴露小仓库(k,v一致省略v)
export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
};
