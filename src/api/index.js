//真实接口
import request from "@/utils/request.js";
//模拟接口
import mockRequest from "@/utils/mockRequest.js";

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
export const addOrUpdateCart = (skuId, skuNum) => request.post(`/cart/addToCart/${skuId}/${skuNum}`);
//获取购物车列表
export const getCartList = () => request.get("/cart/cartList");
//切换商品选中状态
export const isCheckedGood = (skuId, isChecked) => request.get(`/cart/checkCart/${skuId}/${isChecked}`);
//删除购物车商品
export const deleteCartGood = (skuId) => request.delete(`/cart/deleteCart/${skuId}`);

//登录的请求
export const userLogin = (data) => request.post("/user/passport/login", data);
//注册请求
export const userRegister = (data) => request.post("/user/passport/register", data);
//用户注册的手机验证码
export const getUserSendCode = (phone) => request.get(`/user/passport/sendCode/${phone}`);
//获取用户信息
export const getUserInfo = () => request.get("/user/passport/auth/getUserInfo");
//退出登录
export const userLogout = () => request.get("/user/passport/logout");

//获取订单交易页信息，用户地址等
export const getTradeInfo = () => request.get("/order/auth/trade");
//提交订单
export const submitOrder = (tradeNo, data) => request.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data);
//获取订单支付信息
export const userPayMent = (orderId) => request.get(`/payment/weixin/createNative/${orderId}`);
//查询支付订单状态
export const queryPayStatus = (orderId) => request.get(`/payment/weixin/queryPayStatus/${orderId}`);

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
