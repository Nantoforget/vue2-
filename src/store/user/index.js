//user模块的小仓库---state,actions,mutations,getters
//引入请求方法
import { userLogin, userRegister, getUserSendCode, getUserInfo, userLogout } from "@/api";
//引入有关token方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
//存储数据
const state = {
    //手机验证码
    code: "",
    //toke
    token: GET_TOKEN(),
    //用户信息
    userInfo: {},
};
//异步
const actions = {
    //用户手机验证码
    async userCode({ state, commit, dispatch }, phone) {
        let result = await getUserSendCode(phone);
        if (result.code == 200) {
            commit("USERCODE", result.data);
            return "ok";
        } else {
            return Promise.reject();
        }
    },
    //注册
    async registration({ state, commit, dispatch }, { userPhone, password, code }) {
        let result = await userRegister({ phone: userPhone, password, code });
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(result.message);
        }
    },
    //登录
    async userLogin({ state, commit, dispatch }, { phone, password }) {
        let result = await userLogin({ phone, password });
        if (result.code == 200) {
            //将token保存(持久化存储本地存储)
            SET_TOKEN(result.data.token);
            //必须要有commit，否则第一次登陆vuex中没有token(vuex中的state.user.token为null)
            commit("SAVETOKEN", result.data.token);
            return "ok";
        } else {
            return Promise.reject(result.message);
        }
    },
    //获取用户信息
    async getUserInfo({ state, commit, dispatch }) {
        let result = await getUserInfo();
        if (result.code == 200) {
            commit("USERINFO", result.data);
        } else {
            return Promise.reject(result.message);
        }
    },
    //用户退出登录
    async userLogout({ state, commit, dispatch }) {
        let result = await userLogout();
        if (result.code == 200) {
            //提交到mutations
            commit("USERLOGOUT");
            //清楚本地token
            REMOVE_TOKEN();
            return "ok";
        } else {
            return Promise.reject(result.message);
        }
    },
};
//修改数据
const mutations = {
    //验证码
    USERCODE(state, data) {
        state.code = data;
    },
    //保存token
    SAVETOKEN(state, token) {
        state.token = token;
    },
    //保存用户信息
    USERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //用户登出
    USERLOGOUT(state) {
        //清楚vuex中的token
        state.token = "";
        //清楚用户信息
        state.userInfo = {};
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
