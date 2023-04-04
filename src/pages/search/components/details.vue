<template>
    <div>
        <!--details-->
        <div class="details clearfix">
            <!-- 排序 -->
            <div class="sui-navbar">
                <div class="navbar-inner filter">
                    <ul class="sui-nav">
                        <li
                            :class="order == 1 ? 'active' : ''"
                            @click.prevent="changeOrder(1)">
                            <a href="#">
                                综合
                                <span v-show="order == 1">
                                    <span v-if="show1">⬇</span>
                                    <span v-else>⬆</span>
                                </span>
                            </a>
                        </li>
                        <li
                            :class="order == 2 ? 'active' : ''"
                            @click.prevent="changeOrder(2)">
                            <a href="#">
                                价格
                                <span v-show="order == 2">
                                    <span v-if="show2">⬇</span>
                                    <span v-else>⬆</span>
                                </span>
                            </a>
                        </li>
                        <!--  <li>
                            <a href="#">价格⬆</a>
                        </li> -->
                    </ul>
                </div>
            </div>
            <div class="goods-list">
                <ul class="yui3-g">
                    <li
                        class="yui3-u-1-5"
                        v-for="good in goodsList"
                        :key="good.id">
                        <div class="list-wrap">
                            <div class="p-img">
                                <a href="item.html" target="_blank">
                                    <img :src="good.defaultImg" />
                                </a>
                            </div>
                            <div class="price">
                                <strong>
                                    <em>¥</em>
                                    <i>{{ good.price }}</i>
                                </strong>
                            </div>
                            <div class="attr">
                                <a
                                    target="_blank"
                                    href="item.html"
                                    :title="good.title"
                                    >{{ good.title }}</a
                                >
                            </div>
                            <div class="commit">
                                <i class="command"
                                    >已有<span>{{ good.hotScore }}</span
                                    >人评价</i
                                >
                            </div>
                            <div class="operate">
                                <a
                                    href="success-cart.html"
                                    target="_blank"
                                    class="sui-btn btn-bordered btn-danger"
                                    >加入购物车</a
                                >
                                <a
                                    href="javascript:void(0);"
                                    class="sui-btn btn-bordered"
                                    >收藏</a
                                >
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="fr page">
                <div class="sui-pagination clearfix">
                    <!-- <p>start:{{ start }},end:{{ end }}</p> -->
                    <ul>
                        <li
                            class="prev"
                            :class="pageNum == 1 ? 'disabled' : ''"
                            @click.prevent="changePage(pageIndex - 1)">
                            <a href="#">«上一页</a>
                        </li>
                        <li>
                            <a
                                href="#"
                                v-if="start >= 2"
                                @click.prevent="changePage(0)"
                                >1</a
                            >
                        </li>
                        <li class="dotted" v-if="start >= 3"
                            ><span>...</span></li
                        >
                        <li
                            :class="pageIndex == index ? 'active' : ''"
                            v-for="(page, index) in totalPages"
                            v-show="page >= start && page <= end"
                            :key="index"
                            @click.prevent="changePage(index)">
                            <a href="#">{{ page }}</a>
                        </li>
                        <li class="dotted" v-if="end <= totalPages - 2">
                            <span>...</span>
                        </li>
                        <li>
                            <a
                                href="#"
                                v-if="end <= totalPages - 1"
                                @click.prevent="changePage(totalPages - 1)">
                                {{ totalPages }}
                            </a>
                        </li>
                        <li
                            class="next"
                            :class="pageNum == totalPages ? 'disabled' : ''"
                            @click.prevent="changePage(pageIndex + 1)">
                            <a href="#">下一页»</a>
                        </li>
                    </ul>
                    <div>
                        <span>共{{ total }}条&nbsp;</span>
                        <span>
                            共
                            {{ totalPages }}
                            页&nbsp;
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapGetters } from "vuex";
    export default {
        name: "Details",
        data() {
            return {
                //综合排序
                show1: true,
                //价格排序
                show2: true,
                //动态类名
                order: 1,
                //中间连续的页码数
                seriesPage: 5,
                //前后加减
                addOrMinus: null,
                //分页的下标
                pageIndex: 0,
                //分页的页数
                pageNum: 1,
            };
        },
        methods: {
            //综合与价格的切换和箭头上下的切换
            changeOrder(num) {
                //切换综合与价格
                if (this.order != num) {
                    this.order = num;
                    this[`show${num}`] = true;
                    this.$bus.$emit("order", `${num}:desc`);
                } else {
                    //切换升序降序
                    this[`show${num}`] = !this[`show${num}`];
                    if (this[`show${num}`]) {
                        this.$bus.$emit("order", `${num}:desc`);
                    } else {
                        this.$bus.$emit("order", `${num}:asc`);
                    }
                }
            },
            //切换页码
            changePage(index) {
                if (index < 0) return;
                if (index > this.totalPages - 1) return;
                if (this.pageIndex != index) {
                    this.pageIndex = index;
                    this.pageNum = index + 1;
                    this.$bus.$emit("pageNum", this.pageNum);
                }
            },
        },
        computed: {
            //辅助函数获取仓库的数据
            // ...mapState("search", ["searchList"]),
            ...mapState({
                //商品列表
                goodsList: (state) => state.search.searchList.goodsList,
                //总条数
                total: (state) => state.search.searchList.total,
                //总页数
                totalPages: (state) => state.search.searchList.totalPages,
            }),
            //辅助函数获取计算属性的数据
            //两种写法
            // ...mapGetters("search",["goodsList"]),
            /* ...mapGetters({
                goodsList: "search/goodsList",
            }), */
            //计算分页器的页数显示
            //[0,1,2,3,4,5,6,7,8,9,10,11]
            //[1,2,3,4,5,6,7,8,9,10,11,12]
            start: {
                get() {
                    if (this.totalPages <= 5) {
                        //如果总条数小于等于5，则开始一直为1
                        return 1;
                    } else {
                        if (this.pageNum <= 3) {
                            return 1;
                        } else if (
                            this.pageNum >= 4 &&
                            this.pageNum <= this.totalPages - 2
                        ) {
                            return this.pageNum - this.addOrMinus;
                        } else {
                            return this.totalPages - 4;
                        }
                    }
                },
            },
            end: {
                get() {
                    if (this.totalPages <= 5) {
                        return this.totalPages;
                    } else {
                        if (this.pageNum <= 3) {
                            return 5;
                        } else if (
                            this.pageNum >= 4 &&
                            this.pageNum < this.totalPages - 2
                        ) {
                            return this.pageNum + this.addOrMinus;
                        } else {
                            return this.totalPages;
                        }
                    }
                },
            },
        },
        mounted() {
            //加减的页数
            this.addOrMinus = Math.floor(this.seriesPage / 2);
            //挑出第一页和最后一页
        },
    };
</script>
<style lang="less" scoped>
    .details {
        margin-bottom: 5px;

        .sui-navbar {
            overflow: visible;
            margin-bottom: 0;

            .filter {
                min-height: 40px;
                padding-right: 20px;
                background: #fbfbfb;
                border: 1px solid #e2e2e2;
                padding-left: 0;
                border-radius: 0;
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                .sui-nav {
                    position: relative;
                    left: 0;
                    display: block;
                    float: left;
                    margin: 0 10px 0 0;

                    li {
                        float: left;
                        line-height: 18px;

                        a {
                            display: block;
                            cursor: pointer;
                            padding: 11px 15px;
                            color: #777;
                            text-decoration: none;
                        }

                        &.active {
                            a {
                                background: #e1251b;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }

        .goods-list {
            margin: 20px 0;

            ul {
                display: flex;
                flex-wrap: wrap;

                li {
                    height: 100%;
                    width: 20%;
                    margin-top: 10px;
                    line-height: 28px;

                    .list-wrap {
                        .p-img {
                            padding-left: 15px;
                            width: 215px;
                            height: 255px;

                            a {
                                color: #666;

                                img {
                                    max-width: 100%;
                                    height: auto;
                                    vertical-align: middle;
                                }
                            }
                        }

                        .price {
                            padding-left: 15px;
                            font-size: 18px;
                            color: #c81623;

                            strong {
                                font-weight: 700;

                                i {
                                    margin-left: 5px;
                                }
                            }
                        }

                        .attr {
                            padding-left: 15px;
                            width: 85%;
                            overflow: hidden;
                            margin-bottom: 8px;
                            min-height: 38px;
                            cursor: pointer;
                            line-height: 1.8;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;

                            a {
                                color: #333;
                                text-decoration: none;
                            }
                        }

                        .commit {
                            padding-left: 15px;
                            height: 22px;
                            font-size: 13px;
                            color: #a7a7a7;

                            span {
                                font-weight: 700;
                                color: #646fb0;
                            }
                        }

                        .operate {
                            padding: 12px 15px;

                            .sui-btn {
                                display: inline-block;
                                padding: 2px 14px;
                                box-sizing: border-box;
                                margin-bottom: 0;
                                font-size: 12px;
                                line-height: 18px;
                                text-align: center;
                                vertical-align: middle;
                                cursor: pointer;
                                border-radius: 0;
                                background-color: transparent;
                                margin-right: 15px;
                            }

                            .btn-bordered {
                                min-width: 85px;
                                background-color: transparent;
                                border: 1px solid #8c8c8c;
                                color: #8c8c8c;

                                &:hover {
                                    border: 1px solid #666;
                                    color: #fff !important;
                                    background-color: #666;
                                    text-decoration: none;
                                }
                            }

                            .btn-danger {
                                border: 1px solid #e1251b;
                                color: #e1251b;

                                &:hover {
                                    border: 1px solid #e1251b;
                                    background-color: #e1251b;
                                    color: white !important;
                                    text-decoration: none;
                                }
                            }
                        }
                    }
                }
            }
        }

        .page {
            width: 970px;
            height: 66px;
            overflow: hidden;
            float: right;

            .sui-pagination {
                margin: 18px 0;

                ul {
                    margin-left: 0;
                    margin-bottom: 0;
                    vertical-align: middle;
                    width: 700px;
                    float: left;

                    li {
                        line-height: 18px;
                        display: inline-block;
                        margin: 0 5px;

                        a {
                            position: relative;
                            float: left;
                            line-height: 18px;
                            text-decoration: none;
                            background-color: #fff;
                            border: 1px solid #e0e9ee;
                            margin-left: -1px;
                            font-size: 14px;
                            padding: 9px 18px;
                            color: #333;
                        }

                        &.active {
                            a {
                                background-color: rgb(64, 158, 255);
                                color: #e1251b;
                                border-color: #fff;
                                cursor: default;
                            }
                        }

                        &.prev {
                            a {
                                background-color: #fafafa;
                            }
                        }

                        &.disabled {
                            a {
                                color: #999;
                                cursor: default;
                            }
                        }

                        &.dotted {
                            span {
                                margin-left: -1px;
                                position: relative;
                                float: left;
                                line-height: 18px;
                                text-decoration: none;
                                background-color: #fff;
                                font-size: 14px;
                                border: 0;
                                padding: 9px 18px;
                                color: #333;
                            }
                        }

                        &.next {
                            a {
                                background-color: #fafafa;
                            }
                        }
                    }
                }

                div {
                    color: #333;
                    font-size: 14px;
                    float: right;
                    width: 241px;
                    background: #fff;
                    display: flex;
                    span {
                        width: 30%;
                        display: block;
                        height: 36px;
                        text-align: center;
                        line-height: 36px;
                        margin-right: 20px;
                        border: 1px solid #e0e9ee;
                        background: rgb(244, 244, 245);
                    }
                }
            }
        }
    }
</style>
