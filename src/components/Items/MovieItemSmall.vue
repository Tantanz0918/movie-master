<template>
    <li :style="`background-image: url(${img});`" @click="jumpToDetail(router,id)">
        <span class="name">{{name}}</span>
        <span class="score">{{scfilter(score)}}</span>
        <span class="info" v-if="info!=''">
            <span>
                <slot name="beforeInfo"></slot>
                <span>{{info}}</span>
                <slot name="afterInfo"></slot>
            </span>
           
        </span>
        <div class="shadow"></div>
    </li>
    
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router'
import { toRefs } from "@vue/reactivity"
import { jumpToDetail,scfilter } from "../../hook"

const router=useRouter();
const props=defineProps({
    name:String,
    id:Number,
    score:Number,
    img:String,
    info:[String,Number]
})


const {name,id,score,img} =toRefs(props)
</script>

<style lang="less" scoped>
    li{
        margin:20px;
        display: inline-block;
        height: 340px;
        width:230px;
        background-size: 230px 360px;
        position: relative;
        >*{
            position: absolute;
            transition: all 0.3s;
        }
        
        .name{
            bottom: 10px;
            left:10px;
            white-space: nowrap;
            overflow: hidden;
            width:60%;
            text-overflow:ellipsis;
            color:white;
            z-index: 1;
            font-size: larger;
          
        }
        .score{
            bottom: 5px;
            right:5px;
            width:20%;
            font-size:200%;
            color:#e5342a;
            z-index: 1;
        }
        .info{
            top:20px;
            left:-5px;
            height:21px;
            width:0px;
            overflow: hidden;
            // display: none;
            color:white;
            background-color:#e5342a;
            z-index: 1;
            text-align: right;
            vertical-align: middle;
            >span{
                margin-right:10px;
                padding-top:10px;
                line-height:20px;
            }
        }
        .shadow{
            width: 100%;
            height: 30%;
            bottom: 0;
            left:0;
            background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
           
        }
        &:hover{
            .name{
                bottom:25px;
                white-space: normal;
            }
            .score{
                bottom:20px;
            }
            .info{
                width: 140px;
            }
            .shadow{
                height:40%;
            }
        }
    }

</style>