<template>
    <div class="pagination">
        <!-- <h1>{start:{{ start }} end:{{ end }} }</h1> -->
        <button :disabled="pageNum == 1" @click="changePage(pageNum - 1)">
            上一页
        </button>
        <button v-if="start != 1" @click="changePage(1)">1</button>
        <button v-if="start > 2">···</button>

        <button
            v-for="(p, index) in pageAll"
            :key="index"
            @click="changePage(p)"
            v-show="index + 1 >= start && index + 1 <= end"
            :class="pageNum == p ? 'active' : ''"
            :disabled="pageNum == p">
            {{ p }}
        </button>

        <button v-if="end < pageAll - 1">···</button>
        <button v-if="end != pageAll" @click="changePage(pageAll)">
            {{ pageAll }}
        </button>
        <button :disabled="pageNum == pageAll" @click="changePage(pageNum + 1)"
            >下一页</button
        >

        <button style="margin-left: 30px">共 {{ pageAll }} 页</button>
        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        //       总条数    每页显示 现在是第几页 中间连续的页数个数
        props: ["total", "pageSize", "pageNo", "pager"],
        data() {
            return {
                //现在是第几页
                pageNum: null,
                //现在的页数start和end该加减多少
                addOrMinus: null,
            };
        },
        methods: {
            changePage(page) {
                if (page < 1) return;
                if (page > this.pageAll) return;
                this.pageNum = page;
            },
        },
        computed: {
            //总页数
            pageAll() {
                return Math.ceil(this.total / this.pageSize);
            },
            //这个页码前头显示
            start() {
                if (this.pageNum <= this.pager - this.addOrMinus) {
                    return 1;
                } else if (
                    this.pageNum > this.pager - this.addOrMinus &&
                    this.pageNum < this.pageAll - this.addOrMinus
                ) {
                    return this.pageNum - this.addOrMinus;
                } else {
                    return this.pageAll - this.addOrMinus * 2;
                }
            },
            //这个页码前头后头
            end() {
                if (this.pageNum <= this.pager - this.addOrMinus) {
                    return this.pager;
                } else if (
                    this.pageNum > this.pager - this.addOrMinus &&
                    this.pageNum < this.pageAll - this.addOrMinus
                ) {
                    return this.pageNum + this.addOrMinus;
                } else {
                    return this.pageAll;
                }
            },
        },
        mounted() {
            //现在是第几页
            this.pageNum = this.pageNo;
            //现在的页数start和end该加减多少
            this.addOrMinus = Math.floor(this.pager / 2);
        },
    };
</script>

<style lang="less" scoped>
    .pagination {
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>
