/**
 * 参数适配器 普通写法
 */
class SDK {
    phoneStatus(config) {
        let defaultConfig = {
            brand: null,  //手机品牌
            os: null, //系统类型： Andoird或 iOS
            carrier: 'china-mobile', //运营商，默认中国移动
            language: 'zh', //语言类型，默认中文
            network: 'wifi', //网络类型，默认wifi
        }
        //参数适配
        for (let i in config) {
            defaultConfig[i] = config[i] || defaultConfig[i];
        }
        return defaultConfig
    }
}

/**
 * ES6写法
 */
class SDK2 {
    phoneStatus(brand, os, carrier = 'china-mobile', language = 'zh', network = 'wifi') {
        let config = {
            'brand': brand,
            'os': os,
            'carrier': carrier,
            'language': language,
            'network': network,
        }
        return config
    }
}

let config = { brand: '华为', os: 'ios', carrier: '联通' }

let p = new SDK()
let p2 = new SDK2()

p.phoneStatus(config)//{"brand":"华为","os":"ios","carrier":"联通","language":"zh","network":"wifi"}
p2.phoneStatus('华为', 'ios', '联通')//{"brand":"华为","os":"ios","carrier":"联通","language":"zh","network":"wifi"}


/**
 * 数据格式转化适配器
 */
class echartAdapter {
    constructor(){
        this.data = [{
                        "day": "周一",
                        "uv": 6300
                    },
                    {
                        "day": "周二",
                        "uv": 7100
                    }, {
                        "day": "周三",
                        "uv": 4300
                    }, {
                        "day": "周四",
                        "uv": 3300
                    }, {
                        "day": "周五",
                        "uv": 8300
                    }, {
                        "day": "周六",
                        "uv": 9300
                    }, {
                        "day": "周日",
                        "uv": 11300
                    }]
    }
    //x轴适配器
    echartXAxisAdapter(res) {
        return res.map(item => item.day);
    }

    //坐标点适配器
    echartDataAdapter(res) {
        return res.map(item => item.uv);
    }
}

let echartadapter = new echartAdapter()
let echartXAxis = echartadapter.echartXAxisAdapter(echartadapter.data)
let echartData = echartadapter.echartDataAdapter(echartadapter.data)

/**
 * 库适配器
 */

let _html = []
_html.push([{ a: 'a' }, { b: 'b' }, { c: 'c' }, { d: 'd' }])//旧规则

_html = [{a:'a'},{b:'b'},{c:'c'},{d:'d'}]//旧格式

_newHtml = {c: {d: 'd'}}

/**
 *新的库适配器
 */
_html = {
    push: function(arr){
        let [a, b, c, d] = [...arr]
        let _newHtml = {//改变为想要的数据类型
            'c': {'d': d}
        };
        return _newHtml
    }
}

//数据的适配在解决前后端数据依赖上十分重要,但是适配器模式本质上是一个亡羊补牢的模式，它解决的是现存的两个接口之间不兼容的问题