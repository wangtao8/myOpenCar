/**
 * 例一：登陆类
 */
class LoginLayer {//定义一个登陆的类
    constructor() {
        this.instance = null//初始化这个实例化对象
    }
    show(itemVue) {
        itemVue.isShow = true//处理逻辑
    }
    hide(itemVue) {
        itemVue.isShow = false//处理逻辑
    }
    static getInstance() {//单例模式 只会new出一个实例化对象 如果已经有了 会返回之前new好的实例化对象
        if (!this.instance) {
            this.instance = new LoginLayer()
        }
        return this.instance
    }
}

/**
 * 例二：购物车类
 */
class ShopingCar {
    constructor(){
        this.count = 0
        this.instance = null
    }
    add(){
        this.count += 1
    }
    remove(){
        this.count -= 1
    }
    static getInstance(){
        if(!this.instance){
            this.instance = new ShopingCar()
        }
        return this.instance
    }
}

/**
 * 工厂类
 */
class AllCalss {//工厂模式
    TLogionLayer(){//定义一个方法返回登陆的实例对象
        return LoginLayer.getInstance()//直接类名点静态方法名可调用静态方法
    }
    TShopingCar(){
        return ShopingCar.getInstance()
    }
}

/**
 * 创建工厂类的实例对象
 */
const allclass = new AllCalss()//new出工厂类的实例对象
export const loginlayer = allclass.TLogionLayer()//导出登录的方法
export const shopingcar = allclass.TShopingCar()//导出购物车方法