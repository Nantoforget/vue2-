import axios from "axios";
//引入进度条
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { userId } from "@/utils/userTempId";
//自定义axios实例
const requests = axios.create({
    baseURL: "/api",
    timeout: 5000,
});
//请求拦截器
requests.interceptors.request.use(
    //config是一个配置对象：有一个很重要的东西请求头，在这里书写时公共参数
    (config) => {
        //开始请求条
        nProgress.start();
        //用户未登录携带临时身份ID
        config.headers["userTempId"] = userId();
        return config;
    },
    (err) => {
        if (err.code == "ERR_NETWORK") {
            alert("存在跨域问题");
        }
        return Promise.reject(err);
    }
);
//响应拦截器
requests.interceptors.response.use(
    (res) => {
        //结束请求条
        nProgress.done();
        return res.data;
    },
    (err) => {
        return Promise.reject(err);
    }
);
export default requests;
