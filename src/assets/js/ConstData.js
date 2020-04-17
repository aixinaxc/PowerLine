const lineNames = ['curve', 'polyline', 'line']

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

export default {
    lineNames,arrowTypes,animateType,lineStyle
}
