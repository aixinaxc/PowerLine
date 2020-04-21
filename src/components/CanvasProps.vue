<template>
    <div >
        <!-- 选中为空 -->
        <div v-if="!props.node && !props.line && !props.multi">
            <div class="bottom">
                <div class="title">小提示</div>
                <ul class="group">
                    <li>方向键：控制节点移动5个像素</li>
                    <li>Ctrl + 方向键：控制节点移动1个像素</li>
                    <li>Ctrl + 鼠标移动：移动整个画布</li>
                    <li>Ctrl + 鼠标滚轮：缩放</li>
                </ul>
            </div>
        </div>
        <!-- 选中节点 -->
        <div v-if="props.node">
            <div class="title">位置和大小</div>
            <a-row>
                <a-col :span="12">X（px）</a-col>
                <a-col :span="12">Y（px）</a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.node.rect.x"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.node.rect.y"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
            </a-row>

            <a-row>
                <a-col :span="12">宽（px）</a-col>
                <a-col :span="12">高（px）</a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.node.rect.width"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.node.rect.height"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
            </a-row>

            <a-row>
                <a-col :span="12">旋转（°）</a-col>
                <a-col :span="12">圆角（0 - 1）</a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.node.rotate"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.node.borderRadius"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
            </a-row>


            <div class="title">文本</div>
            <a-row align="middle">
                <a-col :span="12" class="padd">文本颜色</a-col>
                <a-col :span="12" class="padd">文本大小</a-col>
                <a-col :span="12">
                    <colorPicker v-model="props.node.font.color=props.node.font.color==undefined?'':props.node.font.color" style="z-index:999;"/>
                </a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.node.font.fontSize"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
            </a-row>
            <a-row align="middle">
                <a-col :span="12" class="padd">水平对齐</a-col>
                <a-col :span="12" class="padd">垂直对齐</a-col>
                <a-col :span="12">
                    <a-select
                            v-model="props.node.font.textAlign"
                            style="width: 80px"
                            @change="onChange"
                    >
                        <a-select-option v-for="item in $ConstData.textAlign" :value="item.name" >
                            {{item.value}}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="12">
                    <a-select
                            v-model="props.node.font.textBaseline"
                            style="width: 80px"
                            @change="onChange"
                    >
                        <a-select-option v-for="item in $ConstData.textBaseline" :value="item.name" >
                            {{item.value}}
                        </a-select-option>
                    </a-select>
                </a-col>
            </a-row>
            <a-row class="padd">
                <a-col :span="24" >文本内容</a-col>
                <a-col :span="24">
                    <a-textarea v-model="props.node.text" placeholder="内容文本" allowClear @change="onChange" />
                </a-col>
            </a-row>


            <div class="title">自定义数据</div>
            <a-row class="padd">
                <a-col :span="24">
                    <a-textarea v-model="props.node.data" placeholder="用户绑定数据" allowClear @change="onChange" />
                </a-col>
            </a-row>

        </div>


        <!--选中连线-->
        <div v-if="props.line" >
            <div class="title">位置</div>
            <a-row align="middle">
                <a-col :span="24" class="padd">起点（X,Y）</a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.line.from.x"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.line.from.y"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
            </a-row>

            <a-row align="middle">
                <a-col :span="24" class="padd">终点（X,Y）</a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.line.to.x"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.line.to.y"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
            </a-row>


            <a-row align="middle">
                <a-col :span="12" class="padd">起点箭头</a-col>
                <a-col :span="12" class="padd">终点箭头</a-col>
                <a-col :span="12">
                    <a-select
                            v-model="props.line.fromArrow"
                            style="width: 80px"
                            @change="onChange"
                    >
                        <a-select-option v-for="item in $ConstData.arrowTypes" :value="item" >
                            <i :class="`iconfont icon-from-${item}`"></i>
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="12">
                    <a-select
                            v-model="props.line.toArrow"
                            style="width: 80px"
                            @change="onChange"
                    >
                        <a-select-option v-for="item in $ConstData.arrowTypes" :value="item">
                            <i :class="`iconfont icon-to-${item}`"></i>
                        </a-select-option>
                    </a-select>
                </a-col>
            </a-row>

            <a-row align="middle">
                <a-col :span="12" class="padd">起点箭头颜色</a-col>
                <a-col :span="12" class="padd">终点箭头颜色</a-col>
                <a-col :span="12">
                    <colorPicker v-model="props.line.fromArrowColor=props.line.fromArrowColor==undefined?'':props.line.fromArrowColor" style="z-index:999;" @change="onChange"/>
                </a-col>
                <a-col :span="12">
                    <colorPicker v-model="props.line.toArrowColor=props.line.toArrowColor==undefined?'':props.line.toArrowColor" style="z-index:999;" @change="onChange"/>
                </a-col>
            </a-row>

            <a-row align="middle">
                <a-col :span="12" class="padd">起点箭头大小</a-col>
                <a-col :span="12" class="padd">终点箭头大小</a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.line.fromArrowSize"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.line.toArrowSize"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
            </a-row>


            <div class="title">样式</div>
            <a-row align="middle">
                <a-col :span="12" class="padd">类型</a-col>
                <a-col :span="12" class="padd">样式</a-col>
                <a-col :span="12">
                    <a-select
                            v-model="props.line.name"
                            style="width: 80px"
                            @change="onChange"
                    >
                        <a-select-option v-for="item in $ConstData.lineNames" :value="item">
                            <i :class="`iconfont icon-${item}`" style="text-align: center"></i>
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="12">
                    <a-select
                            v-model="props.line.dash"
                            style="width: 80px"
                            @change="onChange"
                    >
                        <a-select-option v-for="item in $ConstData.lineStyle" :value="item.name">
                            <img :src="item.value" style="width: 50px;height:30px;"/>
                        </a-select-option>
                    </a-select>
                </a-col>
            </a-row>

            <a-row align="middle">
                <a-col :span="12" class="padd">连线颜色</a-col>
                <a-col :span="12" class="padd">连线宽度</a-col>
                <a-col :span="12">
                    <colorPicker v-model="props.line.strokeStyle=props.line.strokeStyle==undefined?'':props.line.strokeStyle" style="z-index:999;" @change="onChange"/>
                </a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.line.lineWidth"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
            </a-row>

            <a-row align="middle">
                <a-col :span="12" class="padd">边框颜色</a-col>
                <a-col :span="12" class="padd">边框宽度</a-col>
                <a-col :span="12">
                    <colorPicker v-model="props.line.borderColor=props.line.borderColor==undefined?'':props.line.borderColor" style="z-index:999;"/>
                </a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.line.borderWidth"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
            </a-row>
            <a-row align="middle">
                <a-col :span="24" class="padd">透明度（0-1）</a-col>
                <a-col :span="24">
                    <a-input-number
                            style="width: 200px"
                            v-model="props.line.borderWidth"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
            </a-row>


            <div class="title">文本</div>
            <a-row align="middle">
                <a-col :span="12" class="padd">文本颜色</a-col>
                <a-col :span="12" class="padd">文本大小</a-col>
                <a-col :span="12">
                    <colorPicker v-model="props.line.font.color=props.line.font.color==undefined?'':props.line.font.color" style="z-index:999;" @change="onChange"/>
                </a-col>
                <a-col :span="12">
                    <a-input-number
                            v-model="props.line.font.fontSize"
                            controls-position="right"
                            @change="onChange"
                    ></a-input-number>
                </a-col>
            </a-row>
            <a-row align="middle">
                <a-col :span="12" class="padd">水平对齐</a-col>
                <a-col :span="12" class="padd">垂直对齐</a-col>
                <a-col :span="12">
                    <a-select
                            v-model="props.line.font.textAlign"
                            style="width: 80px"
                            @change="onChange"
                    >
                        <a-select-option v-for="item in $ConstData.textAlign" :value="item.name" >
                            {{item.value}}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="12">
                    <a-select
                            v-model="props.line.font.textBaseline"
                            style="width: 80px"
                            @change="onChange"
                    >
                        <a-select-option v-for="item in $ConstData.textBaseline" :value="item.name" >
                            {{item.value}}
                        </a-select-option>
                    </a-select>
                </a-col>
            </a-row>
            <a-row class="padd">
                <a-col :span="24" >文本内容</a-col>
                <a-col :span="24" >
                    <a-textarea v-model="props.line.text" placeholder="线条文本" allowClear @change="onChange" />
                </a-col>
            </a-row>


            <div class="title">动画</div>
            <a-row class="padd">
                <a-col :span="12"><a-checkbox v-model="animateStartBol" @change="animateStart">播放动画</a-checkbox></a-col>
                <a-col :span="12"><a-checkbox v-model="props.line.animatePlay" @change="animateStart">自动播放</a-checkbox></a-col>
            </a-row>

            <a-row align="middle">
                <a-col :span="24" class="padd">动画类型</a-col>
                <a-col :span="24">
                    <a-select
                            v-model="props.line.animateType=props.line.animateType==undefined?'':props.line.animateType"
                            style="width: 200px"
                            @change="animateStart"
                    >
                        <a-select-option v-for="item in $ConstData.animateType" :value="item.name">
                            {{item.value}}
                        </a-select-option>
                    </a-select>
                </a-col>
            </a-row>
            <a-row align="middle">
                <a-col :span="12" class="padd">动画颜色</a-col>
                <a-col :span="12" class="padd">动画速度</a-col>
                <a-col :span="12">
                    <colorPicker v-model="props.line.animateColor=props.line.animateColor==undefined?'':props.line.animateColor" style="z-index:999;" @change="animateStart"/>
                </a-col>
                <a-col :span="12">
                    <a-slider v-model="props.line.animateSpan" id="test" :defaultValue="1" @change="animateStart"/>
                </a-col>
            </a-row>

            <div class="title">自定义数据</div>
            <a-row class="padd">
                <a-col :span="24">
                    <a-textarea v-model="props.line.data" placeholder="用户绑定数据" allowClear @change="onChange" />
                </a-col>
            </a-row>


        </div>


    </div>

</template>

<script>
    export default {
        data() {
            return {
                animateStartBol:false,
            }
        },
        props: {
            canvas: {
                type: Object,
                require: true
            },
            props: {
                type: Object,
                require: true
            }
        },
        methods: {
            animateStart(e){
                console.log("===============")
                if(this.animateStartBol){
                    this.props.line.animateStart = Date.now()
                }else {
                    this.props.line.animateStart = 0
                }
                this.canvas.animate()

            },
            onChange() {
                this.$emit('change', this.props.node)
            }

        }
    }
</script>

<style scoped>
    .padd{
        padding: 10px ;
    }
    .title {
        color: #0d1a26;
        font-weight: 600;
        padding: 0.05rem 0.15rem;
        border-bottom: 1px solid #ccc;
        margin-top: 10px;
    }
</style>
