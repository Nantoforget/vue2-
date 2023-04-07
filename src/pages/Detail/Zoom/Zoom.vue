<template>
    <div class="spec-preview">
        <img :src="(skuImageList[imgIndex] || {}).imgUrl" />
        <div class="event" @mousemove="move"></div>
        <div class="big">
            <img ref="bigImg" :src="(skuImageList[imgIndex] || {}).imgUrl" />
        </div>
        <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
    export default {
        name: "Zoom",
        props: ["skuImageList"],
        data() {
            return {
                //图片下标
                imgIndex: 0,
            };
        },
        methods: {
            move(event) {
                const mask = this.$refs.mask;
                let x = event.offsetX - Math.floor(mask.offsetWidth / 2);
                let y = event.offsetY - Math.floor(mask.offsetWidth / 2);
                if (x <= 0) x = 0;
                if (x >= mask.offsetWidth) x = mask.offsetWidth;
                if (y <= 0) y = 0;
                if (y >= mask.offsetWidth) y = mask.offsetWidth;
                //修改mask蒙版的行内样式
                mask.style.left = x + "px";
                mask.style.top = y + "px";
                //获取big区域
                const bigImg = this.$refs.bigImg;
                bigImg.style.left = -2 * x + "px";
                bigImg.style.top = -2 * y + "px";
            },
            //下面切换图片时，大图片也跟着切换
            changeImg(index) {
                this.imgIndex = index;
            },
        },
        mounted() {
            //兄弟通信
            this.$bus.$on("changeImg", (imgIndex) => {
                this.changeImg(imgIndex);
            });
        },
    };
</script>

<style lang="less">
    .spec-preview {
        position: relative;
        width: 400px;
        height: 400px;
        border: 1px solid #ccc;

        img {
            width: 100%;
            height: 100%;
        }

        .event {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 998;
        }

        .mask {
            width: 50%;
            height: 50%;
            background-color: rgba(230, 0, 255, 0.3);
            position: absolute;
            left: 0;
            top: 0;
            display: none;
        }

        .big {
            width: 100%;
            height: 100%;
            position: absolute;
            top: -1px;
            left: 100%;
            border: 1px solid #aaa;
            overflow: hidden;
            z-index: 998;
            display: none;
            background: white;

            img {
                width: 200%;
                max-width: 200%;
                height: 200%;
                position: absolute;
                left: 0;
                top: 0;
            }
        }

        .event:hover ~ .mask,
        .event:hover ~ .big {
            display: block;
        }
    }
</style>
