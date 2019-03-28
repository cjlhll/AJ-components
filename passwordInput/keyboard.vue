<template>
    <transition name="slideup">
        <div>
            <ul>
                <li v-for="(key,index) in keys" :key="index" @click.stop.prev="keyClick(key)">
                    <a href="javascript:;">{{key}}</a>
                </li>
                <li>
                    <a href="javascript:;" @click.stop.prev="del" class="del-btn">

                    </a>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "keyboard",
        data(){
            return {
                keys:[1,2,3,4,5,6,7,8,9,'',0]
            }
        },
        methods:{
            keyClick(key){
                if(key!==''){
                    this.$emit('keyClick',key);
                }
            },
            del(){
                this.$emit('del');
            }
        }
    }
</script>

<style scoped lang="scss">
    div{
        width: 100%;
        /*border: 1px solid red;*/
        position: absolute;
        bottom: 0;
        z-index: 999;
        background: #fff;
        /*ul:after{
            display: block;
            content: '';
            clear: both;
        }*/
        ul{
            display: flex;
            flex-wrap: wrap;
        }
        $width:100%;
        li{
            width: $width/3;
            box-sizing: border-box;
            height: 50px;
            border-right: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            font-weight: bold;
            &:nth-child(1), &:nth-child(2), &:nth-child(3) {
                border-top: 1px solid #ccc;
            }
            &:nth-child(3), &:nth-child(6), &:nth-child(9), &:nth-child(12) {
                border-right: none;
            }
            &:nth-child(10), &:nth-child(11), &:nth-child(12) {
                border-bottom: none;
            }
            &:nth-child(10), &:nth-child(12), &:active {
                background-color: #d1d4dd;
            }
            &:nth-child(12):active {
                background-color: #fff;
            }
        }
        a{
            color: #000;
            display: block;
            text-align: center;
            line-height: 50px;
            font-size: 24px;
        }
        .del-btn{
            height: 100%;
            background: url("./del_icon.png") no-repeat center center;
            background-size: 25%;
        }
    }

    .slideup-enter-active {
        animation: animateSlide .3s;
    }
    .slideup-leave-active {
        animation: animateSlide .3s reverse;
    }

    @keyframes animateSlide {
        from{
            bottom: -100%;
        }
        to{
            bottom: 0;
        }
    }

</style>