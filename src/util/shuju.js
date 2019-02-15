class Shuju {
    constructor(){
        this.years = []
        this.months = ['01','02','03','04','05','06','07','08','09','10','11','12']
        this.zongSJ = {}
    }
    localSet(name, val){
        localStorage.setItem(name, JSON.stringify(val))
    }
    localGet(name){
        return JSON.parse(localStorage.getItem(name))
    }
    getYears(){//获取没有重复年的数组
        let timeArray = this.localGet('timeArray')
        
        let times = timeArray.map(res => {
            return res.statrtTime
        })
        let years = times.map((item) => {
            return item.split('/')[0]
        })
        this.clearOverTime(years)
    }
    clearOverTime(arr) {//去重
        arr.map(res => {
            if (!this.years.includes(res)) {
                this.years.push(res)
            }
        })
        let time = this.years.sort()
        time.reverse()
        this.years = time
        this.getAllInfo()
    }
    getAllInfo() {//拼装详细数据
        let zongSJ = {}
        let yearsAndMons = {}
        let timeArray = this.localGet('timeArray')
        this.years.map(res => {
            let monObj = {}
            let mons = []
            this.months.map(mon => {
                let monArray = []
                timeArray.map(data => {
                    if (data.statrtTime.indexOf(res + '/' + mon) != -1) {
                        monArray.push(data)
                        monObj[mon] = monArray
                        if(mons.indexOf(mon) == -1){
                            mons.push(mon)
                        }
                        monObj.mon = mons
                    }
                })
            })
            yearsAndMons[res] = monObj
        })
        zongSJ.shuju = yearsAndMons
        zongSJ.years = this.years
        this.localSet('zongSJ', zongSJ)
        console.log('zongSJ:', zongSJ)
    }
}

export const p = new Shuju()