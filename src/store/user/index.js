//user模块的小仓库---state,actions,mutations,getters
import { userLogin, userRegister, getUserSendCode, getUserInfo } from "@/api";
//存储数据
const state = {
    //手机验证码
    code: "",
    //toke
    token: "",
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
            if (localStorage.getItem("TOKEN")) {
                commit("SAVETOKEN", localStorage.getItem("TOKEN"));
            } else {
                //将token保存
                localStorage.setItem("TOKEN", result.data.token);
                commit("SAVETOKEN", result.data.token);
            }

            return "ok";
        } else {
            return Promise.reject(result.message);
        }
    },
    //获取用户信息
    async getUserInfo({ state, commit, dispatch }) {
        let result = await getUserInfo();
        console.log(result);
        if (result.code == 200) {
            commit("USERINFO", result.data);
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
