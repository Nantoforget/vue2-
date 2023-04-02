//引入请求函数
import { reqCategory, reqBanner, reqFloors } from "@/api";
//home模块的小仓库---state,actions,mutations,getters
//存储数据
const state = {
    //一二三级分类列表
    list: [],
    //首页轮播图
    banners: [],
    //首页floor
    floors: [],
};
//异步
const actions = {
    //一二三级分类列表
    async getCategory({ state, commit, dispatch }) {
        let result = await reqCategory();
        if (result.code == "200") {
            commit("GETCATEGORY", result);
        }
    },
    //首页轮播图模拟数据
    async getBanner({ state, dispatch, commit }) {
        let result = await reqBanner();
        if (result.code == "200") {
            commit("GETBANNER", result);
        }
    },
    //首页floors
    async getFloors({ state, commit, dispatch }) {
        let result = await reqFloors();
        if (result.code == "200") {
            commit("GERFLOORS", result);
        }
    },
};
//修改数据
const mutations = {
    //一二三级分类列表
    GETCATEGORY(state, result) {
        state.list = result.data;
    },
    //首页轮播图模拟数据
    GETBANNER(state, result) {
        state.banners = result.data;
    },
    //首页floors
    GERFLOORS(state, result) {
        state.floors = result.data;
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
