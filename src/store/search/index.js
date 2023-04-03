import { reqSearchList } from "@/api";
//search模块的小仓库---state,actions,mutations,getters
//存储数据
const state = {
    //存储搜索结果
    searchList: {},
    //保存选中的属性(发请求使用,格式是 23:8G:运行内存)
    props: [],
    //保存选中的属性名称(遍历使用，只有名字 8G)
    prop: [],
    //保存选中的品牌(发请求使用,格式是 1:小米)
    trademarks: "",
    //保存选中的属性名称(遍历使用，只有名字 小米)
    trademark: [],
};
//异步
const actions = {
    //搜索请求
    async getSearchList({ state, commit, dispatch }, data) {
        let result = await reqSearchList(data);
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data);
        }
    },
    //保存选中的属性
    addProps({ state, dispatch, commit }, val) {
        commit("ADDPROPS", val);
    },
    //保存选中的属性的名称
    addProp({ state, commit, dispatch }, val) {
        let a = state.prop.find((ele) => {
            return ele == val;
        });
        if (!a) {
            commit("ADDPROP", val);
        }
    },
    //保存选中的品牌
    addTrademark({ state, commit, dispatch }, obj) {
        let a = state.trademark.find((ele) => {
            return ele == obj.name;
        });
        if (!a) {
            commit("ADDTRADEMARK", obj);
        }
    },
    //删除属性或品牌
    removePropOrTrademark({ state, commit, dispatch }, attr) {
        let a = state.trademark.findIndex((ele) => {
            return ele == attr;
        });
        if (a == -1) {
            let b = state.prop.findIndex((ele) => {
                return ele == attr;
            });
            commit("REMOVEP", b);
        } else {
            commit("REMOVET", a);
        }
    },
};
//修改数据
const mutations = {
    //搜索请求
    GETSEARCHLIST(state, data) {
        state.searchList = data;
    },
    //保存选中的属性
    ADDPROPS(state, val) {
        state.props.push(val);
    },
    //保存选中的属性的名称
    ADDPROP(state, val) {
        state.prop.push(val);
    },
    //保存选中的品牌
    ADDTRADEMARK(state, obj) {
        let string = `${obj.id}:${obj.name}`;
        state.trademarks = string;
        if (state.trademark[0] != obj.name) {
            state.trademark.push(obj.name);
        }
    },
    //删除已选择的属性或品牌
    REMOVEP(state, index) {
        state.prop.splice(index, 1);
        state.props.splice(index, 1);
    },
    REMOVET(state, index) {
        state.trademark.splice(index, 1);
        state.trademarks = "";
    },
};
//计算属性
const getters = {
    goodsList(state) {
        return state.searchList.goodsList;
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
