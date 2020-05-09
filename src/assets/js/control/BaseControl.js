export const  BaseControls = {
    group: '基础控件',
    children: [
        {
            name: 'text',
            icon: 'icon-text',
            img: require('../../img/text.png'),
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
            img: require('../../img/arrow/line.png'),
            data: {
                text: '直线',
                rect: {
                    width: 80,
                    height: 30
                },
                name: 'line'
            }
        }
    ]
}

