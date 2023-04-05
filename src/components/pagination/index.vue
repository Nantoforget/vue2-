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

        <button style="margin-left: 20px">共 {{ pageAll }} 页</button>
        <button style="margin: 0 20px">共 {{ total }} 条</button>
        <input type="number" v-model="pageNumber" min="1" :max="pageAll" />
        <button @click="toPage" style="margin: 0 20px 0 5px">跳转</button>
        <select v-model="pageNumber">
            <option disabled selected>请选择页码数</option>
            <option v-for="(op, index) in pageAll" :key="index" :value="op">
                {{ op }}
            </option>
        </select>
        <button @click="toPage" style="margin: 0 20px 0 5px">跳转</button>
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
                //输入框，选择框的页码数
                pageNumber: null,
            };
        },
        methods: {
            //点击页码跳转
            changePage(page) {
                if (page < 1) return;
                if (page > this.pageAll) return;
                this.pageNum = page;
                this.pageNumber = page;
            },
            //输入页码数进行跳转
            toPage() {
                //转换为数字  选择页码跳转
                this.pageNumber = +this.pageNumber;
                if (this.pageNumber > this.pageAll) {
                    this.pageNum = this.pageAll;
                    this.pageNumber = this.pageAll;
                } else if (this.pageNumber < 1) {
                    this.pageNum = 1;
                    this.pageNumber = 1;
                } else {
                    this.pageNum = this.pageNumber;
                }
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
                if (this.pageAll <= this.pager) {
                    return this.pageAll;
                } else if (this.pageNum <= this.pager - this.addOrMinus) {
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
            if (this.pageNo > this.pageAll) {
                this.pageNum = 1;
            } else {
                this.pageNum = this.pageNo;
            }
            //现在的页数start和end该加减多少
            this.addOrMinus = Math.floor(this.pager / 2);
            //输入框选择框初始值为传来的pageNo
            this.pageNumber = this.pageNo;
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
        input {
            height: 22px;
            width: 100px;
        }
        select {
            height: 26px;
            width: 100px;
        }
    }
</style>
