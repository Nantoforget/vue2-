import request from "./request.js";

//商品分类的接口
//函数：复用，声明一次，可以多次调用
export const getBaseCategoryList = () => {
    return request({
        url: "/product/getBaseCategoryList",
        method: "get",
    });
};
