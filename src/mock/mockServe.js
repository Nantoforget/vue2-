//引入
import Mock from "mockjs";
//引入模拟数据(webpack自动处理)
import banner from "./banner";
import floors from "./floors";

//造接口

//mock：第一个参数 请求地址
//      第二个参数 将来接口返回的数据

//首页轮播图的接口
Mock.mock("/mock/banner", { code: 200, data: banner });
//楼层接口
Mock.mock("/mock/floors", { code: 200, data: floors });
