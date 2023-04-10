<template>
    <div class="trade-container">
        <h3 class="title">填写并核对订单信息</h3>
        <div class="content">
            <h5 class="receive">收件人信息</h5>
            <div class="address clearFix" v-for="(user, index) in userAddressList" :key="user.id">
                <span @click="select(index)" :class="{ selected: user.isDefault == 1 }" class="username">{{ user.consignee }}</span>
                <p @click="select(index)">
                    <span class="s1">{{ user.fullAddress }}</span>
                    <span class="s2">{{ user.phoneNum }}</span>
                    <span class="s3" v-show="user.isDefault == 1">默认地址</span>
                </p>
            </div>
            <div class="line"></div>
            <h5 class="pay">支付方式</h5>
            <div class="address clearFix">
                <span class="username selected">在线支付</span>
                <span class="username" style="margin-left: 5px">货到付款</span>
            </div>
            <div class="line"></div>
            <h5 class="pay">送货清单</h5>
            <div class="way">
                <h5>配送方式</h5>
                <div class="info clearFix">
                    <span class="s1">天天快递</span>
                    <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
                </div>
            </div>
            <div class="detail">
                <h5>商品清单</h5>
                <ul class="list clearFix" v-for="good in detailArrayList" :key="good.sourceId">
                    <li>
                        <img :src="good.imgUrl" alt="" />
                    </li>
                    <li>
                        <p> {{ good.skuName }}</p>
                        <h4>7天无理由退货</h4>
                    </li>
                    <li>
                        <h3>￥{{ good.orderPrice }}</h3>
                    </li>
                    <li>X{{ good.skuNum }}</li>
                    <li>有货</li>
                </ul>
            </div>
            <div class="bbs">
                <h5>买家留言：</h5>
                <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="userText" @change="userTextMessage"></textarea>
            </div>
            <div class="line"></div>
            <div class="bill">
                <h5>发票信息：</h5>
                <div>普通发票（电子） 个人 明细</div>
                <h5>使用优惠/抵用</h5>
            </div>
        </div>
        <div class="money clearFix">
            <ul>
                <li>
                    <b>
                        <i> {{ goodsNum }} </i>件商品，总商品金额
                    </b>
                    <span>¥{{ goodsPrice }}</span>
                </li>
                <li>
                    <b>返现：</b>
                    <span>0.00</span>
                </li>
                <li>
                    <b>运费：</b>
                    <span>0.00</span>
                </li>
            </ul>
        </div>
        <div class="trade">
            <div class="price"
                >应付金额:　<span>¥{{ goodsPrice }}</span></div
            >
            <div class="receiveInfo">
                寄送至:
                <span>{{ userAddress }}</span>
                收货人：<span>{{ userName }}</span>
                <span>{{ userPhone }}</span>
            </div>
        </div>
        <div class="sub clearFix">
            <button class="subBtn" @click.stop.prevent="submitOrder">提交订单</button>
            <!-- <router-link class="subBtn" to="/pay">提交订单</router-link> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: "Trade",
        data() {
            return {
                //返回的信息
                tradeInfo: {},
                //收件人信息
                userAddressList: [],
                //订单号
                tradeNo: "",
                //商品清单
                detailArrayList: [],
                //用户留言
                userText: "",
            };
        },
        methods: {
            //获取订单交易用户信息地址等
            async getDate() {
                try {
                    let result = await this.$ajax.getTradeInfo();
                    this.tradeInfo = result.data;
                    this.userAddressList = result.data.userAddressList;
                    this.tradeNo = result.data.tradeNo;
                    this.detailArrayList = result.data.detailArrayList;
                } catch (error) {}
            },
            //选一个用户名
            select(index) {
                //排他
                this.userAddressList.forEach((ele) => {
                    ele.isDefault = 0;
                });
                this.userAddressList[index].isDefault = 1;
            },
            //用户留言
            userTextMessage() {
                console.log(this.userText);
            },
            //提交订单
            async submitOrder() {
                //用户信息参数
                const data = {
                    consignee: this.userName,
                    consigneeTel: this.userPhone,
                    deliveryAddress: this.userAddress,
                    paymentWay: "ONLINE",
                    orderComment: this.userText,
                    orderDetailList: this.detailArrayList,
                };
                try {
                    //tradeNo为订单编号
                    let result = await this.$ajax.submitOrder(this.tradeNo, data);
                    if (result.code == 200) {
                        //提交成功，跳转路由
                        this.$router.push({ name: "pay", query: { orderId: result.data } });
                    } else {
                        alert(result.message);
                    }
                } catch (error) {
                    alert(error);
                }
            },
        },
        mounted() {
            //挂载完毕发送请求
            this.getDate();
        },
        computed: {
            //共几件商品
            goodsNum() {
                return this.detailArrayList.reduce((prev, next) => {
                    return prev + next.skuNum;
                }, 0);
            },
            //商品一共多少钱
            goodsPrice() {
                return this.detailArrayList.reduce((prev, next) => {
                    return prev + next.skuNum * next.orderPrice;
                }, 0);
            },
            //收货人
            userName() {
                return (
                    this.userAddressList.find((ele) => {
                        return ele.isDefault == 1;
                    }) || {}
                ).consignee;
            },
            //收货人手机号
            userPhone() {
                return (
                    this.userAddressList.find((ele) => {
                        return ele.isDefault == 1;
                    }) || {}
                ).phoneNum;
            },
            //收货人地址
            userAddress() {
                return (
                    this.userAddressList.find((ele) => {
                        return ele.isDefault == 1;
                    }) || {}
                ).fullAddress;
            },
        },
    };
</script>

<style lang="less" scoped>
    .trade-container {
        .title {
            width: 1200px;
            margin: 0 auto;
            font-size: 14px;
            line-height: 21px;
        }

        .content {
            width: 1200px;
            margin: 10px auto 0;
            border: 1px solid rgb(221, 221, 221);
            padding: 25px;
            box-sizing: border-box;

            .receive,
            .pay {
                line-height: 36px;
                margin: 18px 0;
            }

            .address {
                padding-left: 20px;
                margin-bottom: 15px;

                .username {
                    float: left;
                    width: 100px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    border: 1px solid #ddd;
                    position: relative;
                }

                .username::after {
                    content: "";
                    display: none;
                    width: 13px;
                    height: 13px;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    background: url(./images/choosed.png) no-repeat;
                }

                .username.selected {
                    border-color: #e1251b;
                }

                .username.selected::after {
                    display: block;
                }

                p {
                    width: 610px;
                    float: left;
                    line-height: 30px;
                    margin-left: 10px;
                    padding-left: 5px;
                    cursor: pointer;

                    .s1 {
                        float: left;
                    }

                    .s2 {
                        float: left;
                        margin: 0 5px;
                    }

                    .s3 {
                        float: left;
                        width: 56px;
                        height: 24px;
                        line-height: 24px;
                        margin-left: 10px;
                        background-color: #878787;
                        color: #fff;
                        margin-top: 3px;
                        text-align: center;
                    }
                }

                p:hover {
                    background-color: #ddd;
                }
            }

            .line {
                height: 1px;
                background-color: #ddd;
            }

            .way {
                width: 1080px;
                height: 110px;
                background: #f4f4f4;
                padding: 15px;
                margin: 0 auto;

                h5 {
                    line-height: 50px;
                }

                .info {
                    margin-top: 20px;

                    .s1 {
                        float: left;
                        border: 1px solid #ddd;
                        width: 120px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        margin-right: 10px;
                    }

                    p {
                        line-height: 30px;
                    }
                }
            }

            .detail {
                width: 1080px;

                background: #feedef;
                padding: 15px;
                margin: 2px auto 0;

                h5 {
                    line-height: 50px;
                }
                img {
                    width: 100px;
                    height: 100px;
                }

                .list {
                    display: flex;
                    justify-content: space-between;

                    li {
                        line-height: 30px;

                        p {
                            margin-bottom: 20px;
                        }

                        h4 {
                            color: #c81623;
                            font-weight: 400;
                        }

                        h3 {
                            color: #e12228;
                        }
                    }
                }
            }

            .bbs {
                margin-bottom: 15px;

                h5 {
                    line-height: 50px;
                }

                textarea {
                    width: 100%;
                    border-color: #e4e2e2;
                    line-height: 1.8;
                    outline: none;
                    resize: none;
                }
            }

            .bill {
                h5 {
                    line-height: 50px;
                }

                div {
                    padding-left: 15px;
                }
            }
        }

        .money {
            width: 1200px;
            margin: 20px auto;

            ul {
                width: 220px;
                float: right;

                li {
                    line-height: 30px;
                    display: flex;
                    justify-content: space-between;

                    i {
                        color: red;
                    }
                }
            }
        }

        .trade {
            box-sizing: border-box;
            width: 1200px;
            padding: 10px;
            margin: 10px auto;
            text-align: right;
            background-color: #f4f4f4;
            border: 1px solid #ddd;

            div {
                line-height: 30px;
            }

            .price span {
                color: #e12228;
                font-weight: 700;
                font-size: 14px;
            }

            .receiveInfo {
                color: #999;
            }
        }

        .sub {
            width: 1200px;
            margin: 0 auto 10px;

            .subBtn {
                float: right;
                width: 164px;
                height: 56px;
                font: 700 18px "微软雅黑";
                line-height: 56px;
                text-align: center;
                color: #fff;
                background-color: #e1251b;
            }
        }
    }
</style>
