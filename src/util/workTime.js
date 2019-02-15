class endTime {
    constructor() {
        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,                 //月份 
                "d+": this.getDate(),                    //日 
                "h+": this.getHours(),                   //小时 
                "m+": this.getMinutes(),                 //分 
                "s+": this.getSeconds(),                 //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds()             //毫秒 
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }
    }
    countTime(getToTime, needTime) {
        let getToTimes
        if (new Date(getToTime) == 'Invalid Date') {
            getToTimes = new Date(new Date().format('yyyy/MM/dd') + ' ' + getToTime).getTime()
        } else {
            getToTimes = new Date(getToTime).getTime()
        }
        let needTimes = needTime == undefined ? 8.5 * 60 * 60 * 1000 : needTime * 60 * 60 * 1000 //默认上班时间8.5个小时 可以自行传入参数
        let allTime = getToTimes + needTimes//所需时间
        let mustMinTime = new Date(new Date().format('yyyy/MM/dd') + ' 17:00:00').getTime()//必须在规定时间内
        let mustMaxTime = new Date(new Date().format('yyyy/MM/dd') + ' 18:00:00').getTime()//必须在规定时间内
        let toCardTime = new Date(getToTimes).format("yyyy/MM/dd hh:mm")//打卡时间
        let endTime = new Date(allTime).format("yyyy/MM/dd hh:mm")//结束时间
        if (allTime <= mustMinTime) {
            console.log('打卡时间:', toCardTime, '下班时间:', new Date().format('yyyy/MM/dd') + ' 17:00')
            console.log('%c我去，你来的真早!!!', 'color: green;')
            return (new Date().format('yyyy/MM/dd') + ' 17:00')
        } else if (allTime > mustMaxTime) {
            console.log('打卡时间:', toCardTime, '下班时间:', endTime)
            console.log('%c哦哦哦， 你迟到了！！！', 'color: red;')
            return endTime
        } else {
            console.log('打卡时间:', toCardTime, '下班时间:', endTime)
            return endTime
        }
    }
    nowXinQi(){
        let nowDay = new Date().getDay()
        switch (nowDay) {
            case 0:
                return '星期天'
            case 1:
                return '星期一'
            case 2:
                return '星期二'
            case 3:
                return '星期三'
            case 4:
                return '星期四'
            case 5:
                return '星期五'
            case 6:
                return '星期六'
        }
    }
}

export const endtime = new endTime()