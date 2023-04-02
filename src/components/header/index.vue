<template>
    <div>
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p>
                            <span>请</span>
                            <!-- <a href="###">登录</a> -->
                            <router-link to="/login" title="登录"
                                >登录</router-link
                            >
                            <router-link
                                to="/register"
                                title="注册"
                                class="register">
                                免费注册
                            </router-link>
                            <!-- <a href="###" class="register">免费注册</a> -->
                        </p>
                    </div>
                    <div class="typeList">
                        <a href="###">我的订单</a>
                        <a href="###">我的购物车</a>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <!-- <a class="logo" title="尚品汇" href="###" target="_blank"></a> -->
                    <router-link to="/home" title="尚品汇" class="logo">
                        <img src="./images/logo.png" alt="" />
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input
                            type="text"
                            id="autocomplete"
                            class="input-error input-xxlarge"
                            v-model="keyword" />
                        <button
                            class="sui-btn btn-xlarge btn-danger"
                            type="button"
                            @click="goSearch">
                            搜索
                        </button>
                    </form>
                </div>
            </div>
        </header>
    </div>
</template>
<script>
    export default {
        name: "Header",
        data() {
            return {
                //收集表单文本
                keyword: "",
            };
        },
        methods: {
            //搜索
            goSearch() {
                /*
                    vue-router有两种导航：1.声明式，2.编程式
                                有两种传参方式：
                                    1.query
                                        ?k=val&k=val
                                    2.params(需要在配置路由时占位)
                                        /k=val/k=val
                 */
                //判断是否有query参数
                let query = {};
                if (this.$route.query.categoryName) {
                    query = this.$route.query;
                }
                this.$router.push({
                    //params参数不能与path一起用
                    name: "search",
                    params: {
                        /*
                            如果keyword为空字符串时，跳转会出现路径问题(http://127.0.0.1:8080/#/,控制台会出现警告信息)
                            所有要进行判断，当关键字为空时，重新赋值给undefined
                         */
                        keyword: this.keyword || undefined,
                    },
                    query: query,
                });
                this.keyword = null;
            },
        },
        computed: {},
    };
</script>
<style scoped lang="less">
    .header {
        & > .top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        & + a {
                            border-left: 1px solid #b3aeae;
                        }
                    }
                }
            }
        }

        & > .bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                        animation: login 1s linear 0s infinite;
                    }
                    img:hover {
                        animation-play-state: paused;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
    @keyframes login {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(1.5);
        }
    }
</style>
