<template>
    <div class="page">
        <div class="tools">
            <div v-for="(item, index) in tools" :key="index">
                <div class="title">{{ item.group }}</div>
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

            </div>
        </div>
        <div id="topology-canvas" class="full" @contextmenu="onContextMenu($event)"></div>
        <div style="width:240px;height:100vh;overflow :auto">
            <CanvasProps :canvas="canvas" :props.sync="props" @change="onUpdateProps"></CanvasProps>
        </div>
        <div class="context-menu" v-if="contextmenu.left" :style="this.contextmenu">
            <CanvasContextMenu :canvas="canvas" :props.sync="props"></CanvasContextMenu>
        </div>
    </div>
</template>

<script>
    import {Topology} from 'topology-core'
    import {Tools, canvasRegister} from '../assets/js/PowerLineTool'
    import CanvasProps from './CanvasProps'
    import CanvasContextMenu from './CanvasContextMenu'

    export default {
        name: 'PowerLine',
        data() {
            return {
                tools: Tools,
                canvas: {},
                canvasOptions: {
                    rotateCursor: '/img/rotate.cur'
                },
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
        components: {
            CanvasProps,
            CanvasContextMenu
        },
        computed: {},
        watch: {},
        created() {
            canvasRegister()
            document.onclick = event => {
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
            onDrag(event, node) {
                event.dataTransfer.setData('Text', JSON.stringify(node.data))
            },
            onUpdateProps(node) {
                // 如果是node属性改变，需要传入node，重新计算node相关属性值
                // 如果是line属性改变，无需传参
                console.log('node', node)
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
                // console.log('onMessage:', event, data)
                console.log('data', data)
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
                            locked: this.getLocked(data)
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
                        if (this.canvas && this.canvas.data) {
                            this.$store.commit('canvas/data', {
                                scale: this.canvas.data.scale || 1,
                                lineName: this.canvas.data.lineName,
                                fromArrowType: this.canvas.data.fromArrowType,
                                toArrowType: this.canvas.data.toArrowType,
                                fromArrowlockedType: this.canvas.data.locked
                            })
                        }
                        break
                }
            },
            getLocked(data) {
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
        height: 100vh;
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
        margin-top: 0.08rem;
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

    .page .full {
        flex: 1;
        width: initial;
        position: relative;
        overflow: auto;
        background: #fff;
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

</style>
