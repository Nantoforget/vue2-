<template>
    <div>
        <!-- 商品分类导航 -->
        <div class="type-nav">
            <div class="container" @mouseleave="leaveHandler">
                <h2 class="all">全部商品分类</h2>
                <nav class="nav">
                    <a href="###"> 服装城 </a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <div class="sort">
                    <div class="all-sort-list2" @click.prevent="goSearch">
                        <!-- 一级分类 -->
                        <div
                            class="item"
                            v-for="(c1, index) in list"
                            :key="c1.categoryId">
                            <h3
                                :class="{ cur: currentIndex === index }"
                                @mouseenter="highLight(index)">
                                <!-- data-name是自定义属性，配合事件委派使用的，js中使用dataset来获取自定义属性 -->
                                <a
                                    href=""
                                    :data-name="c1.categoryName"
                                    :data-id="c1.categoryId"
                                    data-categoryId="1">
                                    <!-- @click.prevent=" c1Search(c1.categoryName, c1.categoryId)" -->
                                    {{ c1.categoryName }}
                                </a>
                            </h3>
                            <div
                                class="item-list clearfix"
                                :style="{
                                    display:
                                        currentIndex === index
                                            ? 'block'
                                            : 'none',
                                }">
                                <div
                                    class="subitem"
                                    v-for="c2 in c1.categoryChild"
                                    :key="c2.categoryId">
                                    <!-- 二级分类 -->
                                    <dl class="fore">
                                        <dt>
                                            <a
                                                href=""
                                                :data-name="c2.categoryName"
                                                :data-id="c2.categoryId"
                                                data-categoryId="2"
                                                >{{ c2.categoryName }}</a
                                            >
                                        </dt>
                                        <dd>
                                            <!-- 三级分类 -->
                                            <em
                                                v-for="c3 in c2.categoryChild"
                                                :key="c3.categoryId">
                                                <a
                                                    href=""
                                                    :data-name="c3.categoryName"
                                                    :data-id="c3.categoryId"
                                                    data-categoryId="3"
                                                    >{{ c3.categoryName }}</a
                                                >
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from "vuex";
    //引入lodash(全局引入不提倡)
    // import _ from "lodash";
    //按需引入
    import throttle from "lodash/throttle";
    export default {
        name: "TypeNav",
        data() {
            return {
                //一级分类高亮
                currentIndex: -1,
                /* 防抖(自己写的)
                timer: null,
                节流(自己写的)
                time: null, */
            };
        },
        methods: {
            //一级分类高亮
            highLight: throttle(function (index) {
                // console.log(index);
                this.currentIndex = index;
            }, 100),
            /*********************/
            /* highLight(index) {
                //防抖(自己写的)
                if (!this.timer) {
                    this.timer = setTimeout(function f1() {
                        this.currentIndex = index;
                        console.log(this.currentIndex);
                    }, 1000);
                } else {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(function f1() {
                        this.currentIndex = index;
                        console.log(this.currentIndex);
                    }, 1000);
                }
                //节流(自己写的)
                const time1 = Date.now();
                console.log(time1, "time1");
                if (!this.time) {
                    this.currentIndex = index;
                    this.time = Date.now();
                    console.log(this.time, "this.time第一次");
                } else if (time1 - this.time > 100) {
                    this.currentIndex = index;
                    this.time = Date.now();
                    console.log(this.time, "this.time第二次");
                }
            }, */
            /***********************/
            //一级分类高亮事件委派
            leaveHandler() {
                this.currentIndex = -1;
            },
            //分装路由跳转
            routeJump(query) {
                console.log(typeof query);
                console.log(query);
                this.$router.push({
                    name: "search",
                    query: query,
                });
            },
            //一二三级分类点击搜索事件委派
            goSearch(event) {
                //使用dataset来获取自定义属性
                // console.log(event.target.dataset);
                let { name, id, categoryid } = event.target.dataset;
                if (categoryid) {
                    let a = `category${categoryid}Id`;
                    console.log(a);
                    const query = {
                        categoryName: name,
                        [`category${categoryid}Id`]: id,
                    };
                    this.routeJump(query);
                }
                /* this.$router.push({
                        name: "search",
                        query: {
                            categoryName: name,
                            category1Id: id,
                        },
                    }); */
            },
        },
        computed: {
            ...mapState({
                //相当于给当前组件vc添加了一个属性list,箭头函数return的是list的属性值
                //参数state就是帮我们注册的大仓库数据的state[包含小仓库的数据]
                list: (state) => state.home.list,
            }),
        },
        mounted() {
            this.$store.dispatch("home/getCategory");
        },
    };
</script>
<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                                text-decoration: none;
                            }
                            &.cur {
                                background: pink;
                            }
                        }

                        .item-list {
                            /*display: none;*/
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        /*&:hover {
                            .item-list {
                                display: block;
                            }
                        }*/
                    }
                }
            }
        }
    }
</style>
