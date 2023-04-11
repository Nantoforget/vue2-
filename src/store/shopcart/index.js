//shopcart模块的小仓库---state,actions,mutations,getters
import { getCartList, addOrUpdateCart, isCheckedGood, deleteCartGood } from "@/api";
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
    //切换商品选中状态
    async changeIsChecked({ state, commit, dispatch }, { skuId, isChecked }) {
        let result = await isCheckedGood(skuId, isChecked);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject();
        }
    },
    //全选或全不选
    checkAll({ state, commit, dispatch }, boo) {
        const arr = [];
        state.cartList[0].cartInfoList.forEach((good) => {
            let check = dispatch("changeIsChecked", {
                skuId: good.skuId,
                isChecked: +boo,
            });
            arr.push(check);
        });
        return Promise.all(arr);
    },
    //反选
    reverse({ state, commit, dispatch }) {
        const arr = [];
        console.log(state.cartList[0].cartInfoList);
        state.cartList[0].cartInfoList.forEach((ele) => {
            if (ele.isChecked == 1) {
                ele.isChecked = 0;
            } else {
                ele.isChecked = 1;
            }
            let check = dispatch("changeIsChecked", {
                skuId: ele.skuId,
                isChecked: ele.isChecked,
            });
            arr.push(check);
        });
        return Promise.all(arr);
    },
    //删除单个购物车商品
    async deleteCartGoods({ state, commit, dispatch }, skuId) {
        let result = await deleteCartGood(skuId);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject();
        }
    },
    //删除选中的商品
    deleteGoods({ state, commit, dispatch }) {
        const arr = [];
        state.cartList[0].cartInfoList.forEach((ele) => {
            if (ele.isChecked == 1) {
                //返回的是promise对象
                let good = dispatch("deleteCartGoods", ele.skuId);
                arr.push(good);
            }
        });
        //使用promise.all方法来判断是否都成功
        return Promise.all(arr);
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
