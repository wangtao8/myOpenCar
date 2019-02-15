
//迭代器一
function Each(data) {// es6底层方法调用
    let iterator = data[Symbol.iterator]()
    let item = { done: false }
    while (!item.done) {
        item = iterator.next()
        if (!item.done) {
            console.log(item.value)
        }
    }
}

//迭代器二
function Eachs(data) {// 直接使用for of
    for(item of data) {
        console.log(item)
    }
}

//工厂模式
class Monther {
    // 向妈妈申请所有你想要的  静态方法不需要new 可以直接类名点相应静态方法名 new获取不了静态方法
    static giveMe(whatYouWant) {
        switch (whatYouWant) {
            // 糖糖
            case "tangtang":
                console.log("宝宝，你一个人吃果冻是非常危险的哦，妈妈喂你~~");
                return this.chewJelly(new Jelly);
            // 飞飞
            case "feifei":
                console.log("宝宝，家里已经买了很多飞机了哦，")
                return null;
            default: return null;
        }
    }

    static chewJelly(jelly) {
        jelly.chewed = true;
        return jelly;
    }
}

class Jelly {
    constructor() {
        // 是否咀嚼过的果冻
        this.chewed = false;
    }
}

class ToyPlane {}

let jelly = Monther.giveMe('tangtang'); //宝宝，你一个人吃果冻是非常危险的哦，妈妈喂你~~
let toyPlane = Monther.giveMe('feifei'); //宝宝，家里已经买了很多飞机了哦，

