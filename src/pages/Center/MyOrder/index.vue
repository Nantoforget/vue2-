<template>
    <div class="order-content">
        <div class="title">
            <h3>我的订单</h3>
        </div>
        <div class="chosetype">
            <table>
                <thead>
                    <tr>
                        <th width="29%">商品</th>
                        <th width="31%">订单详情</th>
                        <th width="13%">收货人</th>
                        <th>金额</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="orders">
            <table class="order-item" v-for="trade in records" :key="trade.id">
                <thead>
                    <tr>
                        <th colspan="5">
                            <span class="ordertitle">
                                {{ trade.createTime }}　订单编号：{{ trade.outTradeNo }}
                                <span class="pull-right delete">
                                    <img src="../images/delete.png" />
                                </span>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, index) in trade.orderDetailList" :key="order.id">
                        <td width="60%">
                            <div class="typographic">
                                <img :src="order.imgUrl" />
                                <a href="#" class="block-text">{{ order.skuName }}</a>
                                <span>x{{ order.skuNum }}</span>
                                <a href="#" class="service">售后申请</a>
                            </div>
                        </td>
                        <td :rowspan="trade.orderDetailList.length" v-if="index == 0" width="8%" class="center">{{ trade.consignee }}</td>
                        <td :rowspan="trade.orderDetailList.length" v-if="index == 0" width="13%" class="center">
                            <ul class="unstyled">
                                <li>总金额¥{{ trade.totalAmount }}</li>
                                <li>在线支付</li>
                            </ul>
                        </td>
                        <td :rowspan="trade.orderDetailList.length" v-if="index == 0" width="8%" class="center">
                            <a href="#" class="btn">{{ trade.orderStatusName }} </a>
                        </td>
                        <td :rowspan="trade.orderDetailList.length" v-if="index == 0" width="13%" class="center">
                            <ul class="unstyled">
                                <li>
                                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="choose-order">
            <div class="pagination">
                <Pagination @go="go" :pageNo="page" :pageSize="limit" :total="total" pager="5"></Pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "MyOrder",
        data() {
            return {
                //第几页
                page: 1,
                //每页多少条
                limit: 4,
                //总条数
                total: "",
                //这一页的订单数据
                records: [],
            };
        },
        methods: {
            //获取我的订单
            async getMyOrder() {
                const { page, limit } = this;
                try {
                    let result = await this.$ajax.reqMyOrder(page, limit);
                    if (result.code == 200) {
                        this.total = result.data.total;
                        this.records = result.data.records;
                    }
                } catch (error) {}
            },
            //分页器自定义事件，获取我的订单
            go(pageNum) {
                this.page = pageNum;
                this.getMyOrder();
            },
        },
        computed: {},
        mounted() {
            this.getMyOrder();
        },
    };
</script>
<style lang="less" scoped>
    //订单部分
    .order-content {
        margin: 0 20px;
        color: #666;

        //标题
        .title {
            margin-bottom: 22px;
            border: 1px solid #ddd;

            h3 {
                padding: 12px 10px;
                font-size: 15px;
                background-color: #f1f1f1;
            }
        }

        //表头
        .chosetype {
            margin-bottom: 15px;
            color: #666;

            table {
                border: 1px solid #e6e6e6;
                border-collapse: separate;
                border-radius: 2px;
                width: 100%;
                max-width: 100%;
                border-spacing: 0;

                th {
                    padding: 6px 8px;
                    color: #666;
                    font-weight: 700;
                    vertical-align: bottom;
                    background-color: #f4f4f4;
                    line-height: 18px;
                    border-bottom: 1px solid #e6e6e6;
                    font-size: 12px;
                    text-align: left;
                }
            }
        }

        // 表单内容
        .orders {
            font-size: 12px;

            a {
                &:hover {
                    color: #4cb9fc;
                }
            }

            table {
                border: 1px solid #e6e6e6;
                border-collapse: collapse;
                border-radius: 2px;
                width: 100%;
                margin-bottom: 18px;
                max-width: 100%;

                th {
                    padding: 6px 8px;
                    line-height: 18px;
                    text-align: left;
                    vertical-align: bottom;
                    background-color: #f4f4f4;
                    font-size: 12px;
                    color: #666;

                    .pull-right {
                        float: right;
                        cursor: pointer;

                        img {
                            margin-right: 10px;
                            vertical-align: middle;
                        }
                    }
                }

                td {
                    font-size: 12px;
                    color: #666;
                    padding: 6px 8px;
                    line-height: 18px;
                    text-align: left;
                    vertical-align: middle;
                    border: 1px solid #e6e6e6;

                    &.center {
                        text-align: center;
                    }

                    .typographic {
                        img {
                            float: left;
                            margin-right: 10px;
                        }

                        a {
                            float: left;
                            min-width: 80px;
                            max-width: 250px;
                            color: #e1251b;

                            &.service {
                                color: #666;
                            }
                        }

                        span {
                            float: left;
                            min-width: 80px;
                            max-width: 250px;
                            text-align: center;
                        }
                    }
                    img {
                        width: 100px;
                        height: 100px;
                    }
                }
            }
        }

        // 分页
        .choose-order {
            .pagination {
                margin: 38px 0;

                ul {
                    font-size: 0;
                    display: inline-block;

                    li {
                        display: inline-block;
                        padding: 4px 9px;
                        font-size: 14px;
                        border: 1px solid #e0e9ee;

                        &.prev,
                        &.next {
                            background-color: #fafafa;
                        }

                        &.prev {
                            border-right-color: #28a3ef;
                        }

                        &.page {
                            border-color: #28a3ef;
                            border-left: 0;

                            &.actived {
                                background-color: #28a3ef;

                                a {
                                    color: #fff;
                                }
                            }
                        }
                    }
                }

                div {
                    display: inline-block;
                    font-size: 14px;
                    color: #333;
                }
            }
        }
    }
</style>
