<template>
    <div>
        <div class="bread">
            <ul class="fl sui-breadcrumb">
                <li>
                    <a href="#">全部结果</a>
                </li>
            </ul>
            <ul class="fl sui-tag">
                <li
                    class="with-x"
                    v-for="(attr, index) in attribute"
                    :key="index"
                    >{{ attr }}
                    <i @click="remove(index)">×</i>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mapState } from "vuex";
    export default {
        name: "Bread",
        data() {
            return {
                attribute: [],
            };
        },
        methods: {
            //将选中的属性添加到attribute
            getAttribute() {
                //当执行这个函数时，将保存属性的重置
                this.attribute = [];
                if (this.$route.query.categoryName) {
                    this.attribute.push(this.$route.query.categoryName);
                }
                if (this.$route.params.keyword) {
                    this.attribute.push(this.$route.params.keyword);
                }
                this.attribute.push(...this.trademark);
                this.attribute.push(...this.prop);
            },
            //点击×删除属性并重新发请求
            remove(index) {
                if (index == 0) {
                    if (this.$route.query.categoryName) {
                        const query = {};
                        this.$router.push({
                            name: "search",
                            query: query,
                            params: this.$route.params,
                        });
                    } else if (this.$route.params.keyword) {
                        const params = {
                            keyword: "",
                        };
                        this.$router.push({
                            name: "search",
                            query: this.$route.query,
                            params: params,
                        });
                    } else {
                        this.attribute.splice(index, 1);
                        // this.$store.dispatch("removeProp");
                    }
                } else if (index == 1) {
                    if (this.$route.params.keyword) {
                        const params = {
                            keyword: "",
                        };
                        this.$router.push({
                            name: "search",
                            query: this.$route.query,
                            params: params,
                        });
                    } else {
                        this.attribute.splice(index, 1);
                    }
                } else {
                    this.attribute.splice(index, 1);
                }
            },
        },
        computed: {
            ...mapState("search", ["prop", "trademark"]),
        },
        watch: {
            $route: {
                handler() {
                    this.getAttribute();
                },
            },
            prop: {
                handler() {
                    this.getAttribute();
                },
            },
            trademark: {
                handler() {
                    this.getAttribute();
                },
            },
        },
        mounted() {
            this.getAttribute();
        },
    };
</script>
<style lang="less" scoped>
    .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
            padding: 3px 15px;
            margin: 0;
            font-weight: 400;
            border-radius: 3px;
            float: left;

            li {
                display: inline-block;
                line-height: 18px;

                a {
                    color: #666;
                    text-decoration: none;

                    &:hover {
                        color: #4cb9fc;
                    }
                }
            }
        }

        .sui-tag {
            margin-top: -5px;
            list-style: none;
            font-size: 0;
            line-height: 0;
            padding: 5px 0 0;
            margin-bottom: 18px;
            float: left;

            .with-x {
                font-size: 12px;
                margin: 0 5px 5px 0;
                display: inline-block;
                overflow: hidden;
                color: #000;
                background: #f7f7f7;
                padding: 0 7px;
                height: 20px;
                line-height: 20px;
                border: 1px solid #dedede;
                white-space: nowrap;
                transition: color 400ms;
                cursor: pointer;

                i {
                    margin-left: 10px;
                    cursor: pointer;
                    font: 400 14px tahoma;
                    display: inline-block;
                    height: 100%;
                    vertical-align: middle;
                }

                &:hover {
                    color: #28a3ef;
                }
            }
        }
    }
</style>
