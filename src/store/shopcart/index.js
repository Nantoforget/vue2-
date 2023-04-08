//shopcart模块的小仓库---state,actions,mutations,getters
import { getCartList, addOrUpdateCart } from "@/api";
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
    //添加到购物车(对已有物品进行数量改动)
    async addOrUpdateCart({ state, commit, dispatch }, obj) {
        const { skuId, skuNum } = obj;
        let result = await addOrUpdateCart(skuId, skuNum);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject();
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
const getters = {
    //购物车数据数组的第0向
    info(state) {
        return state.cartList[0] || {};
    },
    //购物车中的商品
    goods(state, getters) {
        return getters.info.cartInfoList || [];
    },
};

//对外暴露小仓库(k,v一致省略v)
export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
};
