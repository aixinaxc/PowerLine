const lineNames = ['curve', 'polyline', 'line','mind']

const arrowTypes = [
    '',
    'triangleSolid',
    'triangle',
    'diamondSolid',
    'diamond',
    'circleSolid',
    'circle',
    'line',
    'lineUp',
    'lineDown'
]

const lineStyle = [
    {name: 0, value: require('../img/arrow/lineStyle.svg')},
    {name: 1, value: require('../img/arrow/lineStyle1.svg')},
    {name: 2, value: require('../img/arrow/lineStyle2.svg')},
    {name: 3, value: require('../img/arrow/lineStyle3.svg')}
    ]

const animateType = [
    {name: "", value: "水流"},
    {name: "beads", value: "水珠"},
    {name: "dot", value: "圆点"},
    {name: "comet", value: "彗星"}
]

const textAlign = [
    {name: "left", value: "左对齐"},
    {name: "center", value: "居中"},
    {name: "right", value: "右对齐"}
]

const textBaseline = [
    {name: "top", value: "上对齐"},
    {name: "middle", value: "居中"},
    {name: "bottom", value: "下对齐"}
]

const Lock = [
    {name: 0, value: "未锁定"},
    {name: 1, value: "只读"},
    {name: 2, value: "禁用"}
]

export default {
    lineNames,arrowTypes,animateType,lineStyle,textAlign,textBaseline,Lock
}
