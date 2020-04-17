import {registerNode} from 'topology-core/middles'
import {
    flowData,
    flowDataAnchors,
    flowDataIconRect,
    flowDataTextRect,
    flowSubprocess,
    flowSubprocessIconRect,
    flowSubprocessTextRect,
    flowDb,
    flowDbIconRect,
    flowDbTextRect,
    flowDocument,
    flowDocumentAnchors,
    flowDocumentIconRect,
    flowDocumentTextRect,
    flowInternalStorage,
    flowInternalStorageIconRect,
    flowInternalStorageTextRect,
    flowExternStorage,
    flowExternStorageAnchors,
    flowExternStorageIconRect,
    flowExternStorageTextRect,
    flowQueue,
    flowQueueIconRect,
    flowQueueTextRect,
    flowManually,
    flowManuallyAnchors,
    flowManuallyIconRect,
    flowManuallyTextRect,
    flowDisplay,
    flowDisplayAnchors,
    flowDisplayIconRect,
    flowDisplayTextRect,
    flowParallel,
    flowParallelAnchors,
    flowComment,
    flowCommentAnchors
} from 'topology-flow-diagram'

import {
    activityFinal,
    activityFinalIconRect,
    activityFinalTextRect,
    swimlaneV,
    swimlaneVIconRect,
    swimlaneVTextRect,
    swimlaneH,
    swimlaneHIconRect,
    swimlaneHTextRect,
    fork,
    forkHAnchors,
    forkIconRect,
    forkTextRect,
    forkVAnchors
} from 'topology-activity-diagram'
import {
    simpleClass,
    simpleClassIconRect,
    simpleClassTextRect,
    interfaceClass,
    interfaceClassIconRect,
    interfaceClassTextRect
} from 'topology-class-diagram'
import {
    lifeline,
    lifelineAnchors,
    lifelineIconRect,
    lifelineTextRect,
    sequenceFocus,
    sequenceFocusAnchors,
    sequenceFocusIconRect,
    sequenceFocusTextRect
} from 'topology-sequence-diagram'

export function canvasRegister() {
    registerNode(
        'flowData',
        flowData,
        flowDataAnchors,
        flowDataIconRect,
        flowDataTextRect
    )
    registerNode(
        'flowSubprocess',
        flowSubprocess,
        null,
        flowSubprocessIconRect,
        flowSubprocessTextRect
    )
    registerNode('flowDb', flowDb, null, flowDbIconRect, flowDbTextRect)
    registerNode(
        'flowDocument',
        flowDocument,
        flowDocumentAnchors,
        flowDocumentIconRect,
        flowDocumentTextRect
    )
    registerNode(
        'flowInternalStorage',
        flowInternalStorage,
        null,
        flowInternalStorageIconRect,
        flowInternalStorageTextRect
    )
    registerNode(
        'flowExternStorage',
        flowExternStorage,
        flowExternStorageAnchors,
        flowExternStorageIconRect,
        flowExternStorageTextRect
    )
    registerNode(
        'flowQueue',
        flowQueue,
        null,
        flowQueueIconRect,
        flowQueueTextRect
    )
    registerNode(
        'flowManually',
        flowManually,
        flowManuallyAnchors,
        flowManuallyIconRect,
        flowManuallyTextRect
    )
    registerNode(
        'flowDisplay',
        flowDisplay,
        flowDisplayAnchors,
        flowDisplayIconRect,
        flowDisplayTextRect
    )
    registerNode('flowParallel', flowParallel, flowParallelAnchors, null, null)
    registerNode('flowComment', flowComment, flowCommentAnchors, null, null)

    // activity
    registerNode(
        'activityFinal',
        activityFinal,
        null,
        activityFinalIconRect,
        activityFinalTextRect
    )
    registerNode(
        'swimlaneV',
        swimlaneV,
        null,
        swimlaneVIconRect,
        swimlaneVTextRect
    )
    registerNode(
        'swimlaneH',
        swimlaneH,
        null,
        swimlaneHIconRect,
        swimlaneHTextRect
    )
    registerNode('forkH', fork, forkHAnchors, forkIconRect, forkTextRect)
    registerNode('forkV', fork, forkVAnchors, forkIconRect, forkTextRect)

    // class
    registerNode(
        'simpleClass',
        simpleClass,
        null,
        simpleClassIconRect,
        simpleClassTextRect
    )
    registerNode(
        'interfaceClass',
        interfaceClass,
        null,
        interfaceClassIconRect,
        interfaceClassTextRect
    )

    // sequence
    registerNode(
        'lifeline',
        lifeline,
        lifelineAnchors,
        lifelineIconRect,
        lifelineTextRect
    )
    registerNode(
        'sequenceFocus',
        sequenceFocus,
        sequenceFocusAnchors,
        sequenceFocusIconRect,
        sequenceFocusTextRect
    )
}

export const Tools = [
    {
        group: '基本形状',
        children: [
            {
                name: 'text',
                icon: 'icon-text',
                img: require('../img/text.png'),
                data: {
                    text: '电网',
                    rect: {
                        width: 80,
                        height: 30
                    },
                    name: 'text'
                }
            },
            {
                name: 'line',
                icon: 'icon-line',
                img: require('../img/arrow/line.png'),
                data: {
                    text: '直线',
                    rect: {
                        width: 80,
                        height: 30
                    },
                    name: 'line'
                }
            },
            {
                name: '红灯',
                icon: 'icon-image',
                img: require('../img/redlight.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/redlight.png')
                }
            },
            {
                name: '箭头',
                icon: 'icon-image',
                img: require('../img/arrow.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/arrow.png')
                }
            },
            {
                name: '绿灯',
                icon: 'icon-image',
                img: require('../img/greenlight.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/greenlight.png')
                }
            },
            {
                name: 'T接线',
                icon: 'icon-image',
                img: require('../img/tline.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/tline.png')
                }
            },
            {
                name: '闪烁灯',
                icon: 'icon-image',
                img: require('../img/twinklelight.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/twinklelight.png')
                }
            },
            {
                name: '地线',
                icon: 'icon-image',
                img: require('../img/groundwire.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/groundwire.png')
                }
            },
            {
                name: '避雷器',
                icon: 'icon-image',
                img: require('../img/lightningarrester.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/lightningarrester.png')
                }
            },
            {
                name: '带单触头高压跌落式熔断器的手车变压',
                icon: 'icon-image',
                img: require('../img/1.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/1.png')
                }
            },
            {
                name: '带有载调压俩圈自耦变压器',
                icon: 'icon-image',
                img: require('../img/2.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/2.png')
                }
            },
            {
                name: '电容式电压互感器',
                icon: 'icon-image',
                img: require('../img/3.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/3.png')
                }
            },
            {
                name: '电压互感器1',
                icon: 'icon-image',
                img: require('../img/4.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/4.png')
                }
            },
            {
                name: '电压互感器2',
                icon: 'icon-image',
                img: require('../img/5.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/5.png')
                }
            },
            {
                name: '电容式电压互感器',
                icon: 'icon-image',
                img: require('../img/6.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/6.png')
                }
            },
            {
                name: '放电间隙',
                icon: 'icon-image',
                img: require('../img/7.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/7.png')
                }
            },
            {
                name: '电阻',
                icon: 'icon-image',
                img: require('../img/resistance.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/resistance.png')
                }
            },
            {
                name: '分裂电抗',
                icon: 'icon-image',
                img: require('../img/8.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/8.png')
                }
            },
            {
                name: '高压熔断器',
                icon: 'icon-image',
                img: require('../img/9.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/9.png')
                }
            },
            {
                name: '接地',
                icon: 'icon-image',
                img: require('../img/10.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/10.png')
                }
            },
            {
                name: '静止无功补偿器',
                icon: 'icon-image',
                img: require('../img/11.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/11.png')
                }
            },
            {
                name: '高压熔断器',
                icon: 'icon-image',
                img: require('../img/12.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/12.png')
                }
            },
            {
                name: '熔断开关',
                icon: 'icon-image',
                img: require('../img/13.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/13.png')
                }
            },
            {
                name: '手车刀闸',
                icon: 'icon-image',
                img: require('../img/15.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/15.png')
                }
            },
            {
                name: '消弧线圈',
                icon: 'icon-image',
                img: require('../img/16.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/16.png')
                }
            },
            {
                name: '站用变',
                icon: 'icon-image',
                img: require('../img/19.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/19.png')
                }
            },
            {
                name: '阻波器',
                icon: 'icon-image',
                img: require('../img/20.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/20.png')
                }
            },
            {
                name: '电抗',
                icon: 'icon-image',
                img: require('../img/21.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/21.png')
                }
            },
            {
                name: '电力电感器',
                icon: 'icon-image',
                img: require('../img/22.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/22.png')
                }
            },
            {
                name: '电流互感器',
                icon: 'icon-image',
                img: require('../img/23.png'),
                data: {
                    text: '',
                    rect: {
                        width: 70,
                        height: 50
                    },
                    name: 'image',
                    image: require('../img/23.png')
                }
            }
        ]
    }
]
