<template>
    <a-layout id="components-layout-demo-fixed">
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%',height: '5vh' }">
            <a-menu
                    theme="dark"
                    mode="horizontal"
                    :style="{ lineHeight: '5vh',height: '5vh' }"
            >
                <a-sub-menu style="float: left">
                    <template slot="title">文件</template>
                    <a-menu-item index="new" @click="handle_new">新建文件</a-menu-item>
                    <a-menu-item index="open" @click="handle_open">打开本地文件（新建）</a-menu-item>
                    <a-menu-item index="replace" @click="handle_replace">导入本地文件...</a-menu-item>
                    <a-menu-item index="save" @click="handle_save">保存到本地</a-menu-item>
                    <a-menu-item index="savePng" @click="handle_savePng">下载为PNG</a-menu-item>
                </a-sub-menu>

                <a-sub-menu>
                    <template slot="title"><i :class="`iconfont icon-${locked}`" @click="onLock"
                                              :title="$store.state.data.locked == 0 ? '锁定':'解锁'"></i></template>
                </a-sub-menu>

                <a-sub-menu>
                    <template slot="title"><i :class="`iconfont icon-${lineName}`"></i></template>
                    <a-menu-item disabled>连线类型:</a-menu-item>
                    <a-menu-item
                            v-for="(item, index) in $ConstData.lineNames"
                            :key="index"
                            :index="`line-${item}`"
                            @click="onState('lineName', item)"
                    >
                        <i :class="`iconfont icon-${item}`"></i>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu>
                    <template slot="title"><i :class="`iconfont icon-from-${fromArrowType}`"></i></template>
                    <a-menu-item disabled>起点箭头:</a-menu-item>
                    <a-menu-item
                            v-for="(item, index) in $ConstData.arrowTypes"
                            :key="index"
                            :index="`line-${item}`"
                            @click="onState('fromArrowType', item)"
                    >
                        <i :class="`iconfont icon-from-${item}`"></i>
                    </a-menu-item>
                </a-sub-menu>

                <a-sub-menu>
                    <template slot="title"><i :class="`iconfont icon-to-${toArrowType}`"></i></template>
                    <a-menu-item disabled>终点箭头:</a-menu-item>
                    <a-menu-item
                            v-for="(item, index) in $ConstData.arrowTypes"
                            :key="index"
                            :index="`line-${item}`"
                            @click="onState('toArrowType', item)"
                    >
                        <i :class="`iconfont icon-to-${item}`"></i>
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-header>
        <a-layout-content :style="{ padding: '0 0px', marginTop: '5vh' }">
            <div class="page">
                <!--左侧控件区-->
                <a-collapse style="width: 200px">
                    <a-collapse-panel v-for="(item, index) in tools" :header="item.group" :key="index">
                        <a-row>
                            <a-col :span="8" v-for="(btn, i) in item.children">
                                <a
                                        :key="i"
                                        :title="btn.name"
                                        :draggable="btn.data"
                                        @dragstart="onDrag($event, btn)"
                                >
                                    <img :src="btn.img"/>
                                </a>
                            </a-col>
                        </a-row>
                    </a-collapse-panel>
                </a-collapse>
                <!--主画布区-->
                <div id="topology-canvas" class="full" @contextmenu="onContextMenu($event)"></div>
                <!--右侧控件调整区-->
                <div style="width:240px;overflow :auto">
                    <CanvasProps :canvas="canvas" :props.sync="props" @change="onUpdateProps"></CanvasProps>
                </div>
                <!--右键菜单控件-->
                <div class="context-menu" v-if="contextmenu.left" :style="this.contextmenu">
                    <CanvasContextMenu :canvas="canvas" :props.sync="props"></CanvasContextMenu>
                </div>
            </div>
        </a-layout-content>

    </a-layout>
</template>

<script>
    import * as FileSaver from 'file-saver'
    import {Topology} from 'topology-core'
    import {canvasRegister} from '../assets/js/PowerLineTool'
    import CanvasProps from './CanvasProps'
    import CanvasContextMenu from './CanvasContextMenu'
    import {BaseControls} from '../assets/js/control/BaseControl'
    import {PowerLineControls} from '../assets/js/control/PowerLineControl'

    export default {
        name: 'PowerLine',
        components: {
            CanvasProps,
            CanvasContextMenu
        },
        data() {
            return {
                tools: [BaseControls, PowerLineControls],
                canvas: {},
                canvasOptions: {},
                props: {
                    node: null,
                    line: null,
                    nodes: [],
                    multi: false,
                    locked: false
                },
                contextmenu: {
                    left: null,
                    top: null,
                    bottom: null
                },
                eventData: {
                    name: '',
                    data: null
                }
            }
        },
        computed: {
            locked() {
                if (this.$store.state.data.locked == 0) {
                    return "lock"
                } else {
                    return "unlock"
                }
            },
            scale() {
                return Math.floor(this.$store.state.data.scale * 100)
            },
            lineName() {
                return this.$store.state.data.lineName
            },
            fromArrowType() {
                return this.$store.state.data.fromArrowType
            },
            toArrowType() {
                return this.$store.state.data.toArrowType
            }
        },
        watch: {},
        created() {
            console.log("tools:", this.tools)
            canvasRegister()
            document.body.onclick = event => {
                //console.log("========")
                this.contextmenu = {
                    left: null,
                    top: null,
                    bottom: null
                }
            }
        },
        mounted() {
            this.canvasOptions.on = this.onMessage
            this.canvas = new Topology('topology-canvas', this.canvasOptions)
        },
        methods: {
            onLock() {
                console.log(this.canvas, this.canvas)
                if (this.canvas.data["locked"] == 0) {
                    this.onState("locked", 1)
                } else {
                    this.onState("locked", 0)
                }
            },
            onState(key, value) {
                //console.log("___________________", key, value)
                this.$store.commit('dataUpdata', {
                    key: key,
                    value: value
                })
                this.canvas.data[key] = value
            },
            onDrag(event, node) {
                event.dataTransfer.setData('Text', JSON.stringify(node.data))
            },
            onUpdateProps(node) {
                // 如果是node属性改变，需要传入node，重新计算node相关属性值
                // 如果是line属性改变，无需传参
                //console.log('node', node)
                this.canvas.updateProps(node)
            },
            onContextMenu(event) {
                event.preventDefault()
                event.stopPropagation()

                if (event.clientY + 360 < document.body.clientHeight) {
                    this.contextmenu = {
                        left: event.clientX + 'px',
                        top: event.clientY + 'px'
                    }
                } else {
                    this.contextmenu = {
                        left: event.clientX + 'px',
                        bottom: document.body.clientHeight - event.clientY + 'px'
                    }
                }
            },
            onMessage(event, data) {
                //console.log('onMessage:', event, data)
                switch (event) {
                    case 'node':
                    case 'addNode':
                        this.props = {
                            node: data,
                            line: null,
                            multi: false,
                            nodes: null,
                            locked: data.locked
                        }
                        break
                    case 'line':
                    case 'addLine':
                        this.props = {
                            node: null,
                            line: data,
                            multi: false,
                            nodes: null,
                            locked: data.locked
                        }
                        break
                    case 'multi':
                        this.props = {
                            node: null,
                            line: null,
                            multi: true,
                            nodes: data.length > 1 ? data : null,
                            locked: this.getLocked({nodes: data})
                        }
                        break
                    case 'space':
                        this.props = {
                            node: null,
                            line: null,
                            multi: false,
                            nodes: null,
                            locked: false
                        }
                        break
                    case 'moveOut':
                        break
                    case 'moveNodes':
                    case 'resizeNodes':
                        if (data.length > 1) {
                            this.props = {
                                node: null,
                                line: null,
                                multi: true,
                                nodes: data,
                                locked: this.getLocked({nodes: data})
                            }
                        } else {
                            this.props = {
                                node: data[0],
                                line: null,
                                multi: false,
                                nodes: null,
                                locked: false
                            }
                        }
                        break
                    case 'resize':
                    case 'scale':
                    case 'locked':
                        //console.log("locked")
                        if (this.canvas && this.canvas.data) {
                            this.$store.commit('data', {
                                scale: this.canvas.data.scale || 1,
                                lineName: this.canvas.data.lineName,
                                fromArrowType: this.canvas.data.fromArrowType,
                                toArrowType: this.canvas.data.toArrowType,
                                fromArrowlockedType: this.canvas.data.locked
                            })
                        }
                        break
                    default:
                        //console.log("--------------------------", event)
                }
            },
            getLocked(data) {
                //console.log("getLocked", data, data.nodes)
                let locked = true
                if (data.nodes && data.nodes.length) {
                    for (const item of data.nodes) {
                        if (!item.locked) {
                            locked = false
                            break
                        }
                    }
                }
                if (locked && data.lines) {
                    for (const item of data.lines) {
                        if (!item.locked) {
                            locked = false
                            break
                        }
                    }
                }
                return locked
            },
            handle_new(data) {
                this.canvas.open({nodes: [], lines: []})
            },
            handle_open(data) {
                this.handle_replace(data)
            },
            handle_replace(data) {
                const input = document.createElement('input')
                input.type = 'file'
                input.onchange = event => {
                    const elem = event.srcElement || event.target
                    if (elem.files && elem.files[0]) {
                        const name = elem.files[0].name.replace('.json', '')
                        const reader = new FileReader()
                        reader.onload = e => {
                            const text = e.target.result + ''
                            try {
                                const data = JSON.parse(text)
                                if (
                                    data &&
                                    Array.isArray(data.nodes) &&
                                    Array.isArray(data.lines)
                                ) {
                                    this.canvas.open(data)
                                }
                            } catch (e) {
                                return false
                            }
                        }
                        reader.readAsText(elem.files[0])
                    }
                }
                input.click()
            },
            handle_save(data) {
                FileSaver.saveAs(
                    new Blob([JSON.stringify(this.canvas.data)], {
                        type: 'text/plain;charset=utf-8'
                    }),
                    `电网.json`
                )
            },
            handle_savePng(data) {
                this.canvas.saveAsImage('电网.png')
            },
            handle_undo(data) {
                this.canvas.undo()
            },
            handle_redo(data) {
                this.canvas.redo()
            },
            handle_copy(data) {
                this.canvas.copy()
            },
            handle_cut(data) {
                this.canvas.cut()
            },
            handle_parse(data) {
                this.canvas.parse()
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/icon.css";

    .page {
        display: flex;
        width: 100%;
        height: 95vh;
    }

    .page .tools {
        flex-shrink: 0;
        width: 200px;
        background-color: #f8f8f8;
        border-right: 1px solid #d9d9d9;
        overflow-y: auto;
    }

    .page .tools .title {
        color: #0d1a26;
        font-weight: 600;
        font-size: 16px;
        line-height: 1;
        padding: 0.05rem 0.1rem;
        margin-top: 0.8rem;
        border-bottom: 1px solid #ddd;
    }

    .page .tools .title :first-child {
        border-top: none;
    }

    .page .tools .buttons {
        padding: 0.1rem 0;
    }

    .page .tools .buttons a {
        display: inline-block;
        color: #314659;
        line-height: 1;
        width: 4rem;
        height: 4rem;
        text-align: center;
        text-decoration: none !important;
    }

    .page .tools .buttons a .iconfont {
        font-size: 30px;
    }

    .full {
        flex: 1;
        width: initial;
        position: relative;
        overflow: auto;
        background: #FFFAF0;
    }

    .page .props {
        flex-shrink: 0;
        width: 200px;
        padding: 0.1rem 0;
        background-color: #f8f8f8;
        border-left: 1px solid #d9d9d9;
        overflow-y: auto;
        position: relative;
    }

    .page .context-menu {
        width: 200px;
        position: fixed;
        z-index: 10;
    }

    .iconfont {
        color: #fff;
        font-size: 2rem;
    }
</style>
