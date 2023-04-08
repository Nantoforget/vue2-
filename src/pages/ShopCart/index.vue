<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <!-- 购物车商品 -->
            <div class="cart-body">
                <ul class="cart-list" v-for="good in goods" :key="good.id">
                    <li class="cart-list-con1">
                        <input
                            type="checkbox"
                            name="chk_list"
                            :checked="good.isChecked == 1" />
                    </li>
                    <li class="cart-list-con2">
                        <img :src="good.imgUrl" />
                        <div class="item-msg">
                            {{ good.skuName }}
                        </div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{ good.cartPrice }}</span>
                    </li>
                    <li class="cart-list-con5">
                        <a
                            href="javascript:void(0)"
                            @click="
                                addOrMinus('minus', good.skuId, good.skuNum)
                            "
                            class="mins">
                            -
                        </a>
                        <input
                            autocomplete="off"
                            type="text"
                            :value="good.skuNum"
                            minnum="1"
                            class="itxt"
                            @input="changeGoodNum(good, $event)" />
                        <a
                            href="javascript:void(0)"
                            @click="addOrMinus('add', good.skuId, good.skuNum)"
                            class="plus">
                            +
                        </a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">
                            {{ good.skuNum * good.cartPrice }}
                        </span>
                    </li>
                    <li class="cart-list-con7">
                        <a href="#none" class="sindelet">删除</a>
                        <br />
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input class="chooseAll" type="checkbox" />
                <span>全选</span>
            </div>
            <div class="option">
                <a href="#none">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下架商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">
                    已选择 <span>{{ chosed }}</span> 件商品
                </div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{ sumMoney }}</i>
                </div>
                <div class="sumbtn">
                    <a class="sum-btn" href="###" target="_blank">结算</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //lodash的防抖
    import debounce from "lodash/debounce";
    import { mapGetters } from "vuex";
    export default {
        name: "ShopCart",
        data() {
            return {
                //防抖
                timer: null,
                //节流
                t: null,
            };
        },
        methods: {
            //发送请求，获取购物车数据
            getCartList() {
                this.$store.dispatch("shopcart/getCartList");
            },
            //修改商品的请求
            addOrUpdateCart(skuId, skuNum) {
                return this.$store.dispatch("shopcart/addOrUpdateCart", {
                    skuId,
                    skuNum,
                });
            },
            //增加减少商品数量,点击加减符号修改
            async addOrMinus(keyword, skuId, skuNum) {
                let t1 = Date.now();
                if (keyword == "add") {
                    //加1
                    try {
                        skuNum = 1;
                        await this.addOrUpdateCart(skuId, skuNum);
                        this.getCartList();
                    } catch (error) {
                        alert("修改失败");
                    }
                } else if (keyword == "minus") {
                    //减1
                    if (skuNum > 1) {
                        //节流
                        console.log(t1 - this.t);
                        if (t1 - this.t > 1000) {
                            this.t = Date.now();
                            try {
                                //节流
                                skuNum = -1;
                                await this.addOrUpdateCart(skuId, skuNum);
                                this.getCartList();
                            } catch (error) {
                                alert("修改失败");
                            }
                        }
                    }
                }
            },
            //input框修改商品数量
            changeGoodNum: debounce(async function (good, $event) {
                //输入的内容
                let content = +$event.target.value;
                let num = null;
                if (!(isNaN(content) || content < 1)) {
                    num = content - good.skuNum;
                } else {
                    num = 0;
                }
                try {
                    await this.addOrUpdateCart(good.skuId, num);
                    this.getCartList();
                } catch (error) {
                    alert("修改失败");
                }
            }, 500),
        },
        mounted() {
            this.getCartList();
        },
        computed: {
            ...mapGetters("shopcart", ["goods"]),
            //总价
            sumMoney() {
                let val = 0;
                const sum = this.goods.reduce((pre, next) => {
                    return pre + next.cartPrice * next.skuNum;
                }, val);
                return sum;
            },
            //已选择几件商品
            chosed() {
                let val = 0;
                const sum = this.goods.reduce((pre, next) => {
                    return pre + next.skuNum;
                }, val);
                return sum;
            },
        },
    };
</script>

<style lang="less" scoped>
    .cart {
        width: 1200px;
        margin: 0 auto;

        h4 {
            margin: 9px 0;
            font-size: 14px;
            line-height: 21px;
        }

        .cart-main {
            .cart-th {
                background: #f5f5f5;
                border: 1px solid #ddd;
                padding: 10px;
                overflow: hidden;

                & > div {
                    float: left;
                }

                .cart-th1 {
                    width: 25%;

                    input {
                        vertical-align: middle;
                    }

                    span {
                        vertical-align: middle;
                    }
                }

                .cart-th2 {
                    width: 25%;
                }

                .cart-th3,
                .cart-th4,
                .cart-th5,
                .cart-th6 {
                    width: 12.5%;
                }
            }

            .cart-body {
                margin: 15px 0;
                border: 1px solid #ddd;

                .cart-list {
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                    overflow: hidden;

                    & > li {
                        float: left;
                    }

                    .cart-list-con1 {
                        width: 15%;
                    }

                    .cart-list-con2 {
                        width: 35%;

                        img {
                            width: 82px;
                            height: 82px;
                            float: left;
                        }

                        .item-msg {
                            float: left;
                            width: 150px;
                            margin: 0 10px;
                            line-height: 18px;
                        }
                    }

                    /*.cart-list-con3 {
                        width: 20.8333%;

                        .item-txt {
                            text-align: center;
                        }
                    }*/

                    .cart-list-con4 {
                        width: 10%;
                    }

                    .cart-list-con5 {
                        width: 17%;

                        .mins {
                            border: 1px solid #ddd;
                            border-right: 0;
                            float: left;
                            color: #666;
                            width: 6px;
                            text-align: center;
                            padding: 8px;
                        }

                        input {
                            border: 1px solid #ddd;
                            width: 40px;
                            height: 33px;
                            float: left;
                            text-align: center;
                            font-size: 14px;
                        }

                        .plus {
                            border: 1px solid #ddd;
                            border-left: 0;
                            float: left;
                            color: #666;
                            width: 6px;
                            text-align: center;
                            padding: 8px;
                        }
                    }

                    .cart-list-con6 {
                        width: 10%;

                        .sum {
                            font-size: 16px;
                        }
                    }

                    .cart-list-con7 {
                        width: 13%;

                        a {
                            color: #666;
                        }
                    }
                }
            }
        }

        .cart-tool {
            overflow: hidden;
            border: 1px solid #ddd;

            .select-all {
                padding: 10px;
                overflow: hidden;
                float: left;

                span {
                    vertical-align: middle;
                }

                input {
                    vertical-align: middle;
                }
            }

            .option {
                padding: 10px;
                overflow: hidden;
                float: left;

                a {
                    float: left;
                    padding: 0 10px;
                    color: #666;
                }
            }

            .money-box {
                float: right;

                .chosed {
                    line-height: 26px;
                    float: left;
                    padding: 0 10px;
                }

                .sumprice {
                    width: 200px;
                    line-height: 22px;
                    float: left;
                    padding: 0 10px;

                    .summoney {
                        color: #c81623;
                        font-size: 16px;
                    }
                }

                .sumbtn {
                    float: right;

                    a {
                        display: block;
                        position: relative;
                        width: 96px;
                        height: 52px;
                        line-height: 52px;
                        color: #fff;
                        text-align: center;
                        font-size: 18px;
                        font-family: "Microsoft YaHei";
                        background: #e1251b;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>
