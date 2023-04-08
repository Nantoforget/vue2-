import { getDetailList, addOrUpdateCart, getCartList } from "@/api";
//detail模块的小仓库---state,actions,mutations,getters
//存储数据
const state = {
    //详情页数据
    detailList: {},
};
//异步
const actions = {
    //详情页请求
    async getDetailList({ state, commit, dispatch }, skuId) {
        let result = await getDetailList(skuId);
        if (result.code == 200) {
            commit("GETDETAILLIST", result.data);
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
    //详情页请求回来的数据
    GETDETAILLIST(state, data) {
        state.detailList = data;
    },
};
//计算属性
const getters = {
    //简化面包屑数据
    categoryView(state) {
        return state.detailList.categoryView || {}; //数组可能不报错
    },
    //商品信息
    skuInfo(state) {
        return state.detailList.skuInfo || {};
    },
    //商品销售属性
    spuSaleAttrList(state) {
        return state.detailList.spuSaleAttrList;
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
