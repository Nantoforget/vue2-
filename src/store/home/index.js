import { reqCategory } from "@/api";
//home模块的小仓库---state,actions,mutations,getters
//存储数据
const state = {
    list: [],
};
//异步
const actions = {
    async getCategory({ state, commit, dispatch }) {
        let result = await reqCategory();
        console.log(result);
        commit("GETCATEGORY", result);
    },
};
//修改数据
const mutations = {
    GETCATEGORY(state, result) {
        state.list = result.data;
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
