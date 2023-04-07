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
//详情页请求接口
export const getDetailList = (skuId) => request.get(`/item/${skuId}`);
//添加到购物车(对已有物品进行数量改动)
export const addOrUpdateCart = (skuId, skuNum) =>
    request.post(`/cart/addToCart/${skuId}/${skuNum}`);
//获取购物车列表
export const getCartList = () => request.get("/cart/cartList");

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
