//真实接口
import request from "./request.js";
//模拟接口
import mockRequest from "./mockRequest.js";

//真实接口
//商品分类的接口
//函数：复用，声明一次，可以多次调用
export const reqCategory = () => {
    return request({
        url: "/product/getBaseCategoryList",
        method: "get",
    });
};
//搜素请求的接口
export const reqSearchList = (searchObj) => {
    return request({
        url: "/list",
        method: "post",
        data: searchObj,
    });
};

//模拟接口
//首页轮播图
export const reqBanner = () => {
    return mockRequest({
        url: "/banner",
        method: "get",
    });
};
//首页floors
export const reqFloors = () => {
    return mockRequest({
        url: "/floors",
        method: "get",
    });
};
