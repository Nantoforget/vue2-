import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
//自定义axios实例
const requests = axios.create({
    baseURL: "/api",
    timeout: 5000,
});
//请求拦截器
requests.interceptors.request.use(
    (config) => {
        //开始请求条
        nProgress.start();
        return config;
    },
    (err) => {
        if (err.code == "ERR_NETWORK") {
            alert("存在跨域问题");
        }
        return new Promise.reject(err);
    }
);
//响应拦截器
requests.interceptors.response.use((res) => {
    //结束请求条
    nProgress.done();
    return res.data;
});
export default requests;
