class ShopingCar{
    constructor(){
        this.count = 0
    }
    CarAdd(){
        this.count += 1;
    }
    CarRemove(){
        this.count -= 1;
    }
}

class AllClass{
    myCar(){
        return new ShopingCar();
    }
}

let AllCla = new AllClass();
export let Car = AllCla.myCar();