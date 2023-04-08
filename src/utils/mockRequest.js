//模拟数据的请求(在浏览器的Network中看不到)
import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

const mockRequests = axios.create({
    baseURL: "/mock",
    timeout: 5000,
});
//请求拦截器
mockRequests.interceptors.request.use(
    (config) => {
        nProgress.start();
        return config;
    },
    (err) => {
        return new Promise.reject(err);
    }
);
//响应拦截器
mockRequests.interceptors.response.use(
    (res) => {
        nProgress.done();
        return res.data;
    },
    (err) => {
        return new Promise.reject(err);
    }
);
//暴露
export default mockRequests;
