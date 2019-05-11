// 字符串是否是包含26个英文字母的短句
export function isPangram(str){
    const string = str.toLowerCase();
    return "abcdefghijklmnopqrstuvwxyz".split("").every(x => string.indexOf(x) !== -1);
}

// 英文首字母大写
export function camelCase(str){
    return str.trim().replace(/(?:^|\s+)(\w)/g, (_, c) => _.toUpperCase())
}

// 睡眠函数
export function sleep(delay){
    return new Promise(reslove => {
        setTimeout(reslove, delay)
    })
}

// 数组去重
export function  unique(arg){
    return [...new Set(arg)]
}

// 数字格式化 3000 -> 3,000
export function formatNumber(str){
    return (''+str).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // number [number].toLocaleString('en-US')
}

// 非大数取整
export function intNumber(num){
    return ~~num
    //  num|0
}

// 数组求和
export function sumArr(arr){
    return arr.reduce((a, b) => a + b)
}

// 类数组转数组
export function list2arr(){
    return [...arguments]
}

// 值对换
// [a,b] = [b,a]
// a^=b b^=a a^=b

// 数组乱序
export function arrRandom(arr){
    return arr.sort(()=>Math.random()-.5)
}

// 取时间戳
// number(<Date>) -> + <Date>

// 取随机字符串 为长度 max 10 min 0
export function randomStr(l = 0){
    const LENGTH = 13 - l
    return Math.random().toString(16).substring(LENGTH) 
    // Math.random().toString(36).substring(2) 
}

// withinErrorMargin(0.1 + 0.2, 0.3) 
export function withinErrorMargin(left, right) {
    return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

// fill array
// Array(6).fill(8)// [8,8,8,8,8,8]

// chain 链式取值
export function get(obj, props, def) {
    if((obj == null) || obj == null || typeof props !== 'string') return def;
    const temp = props.split('.');
    const fieldArr = [].concat(temp);
    temp.forEach((e, i) => {
        if(/^(\w+)\[(\w+)\]$/.test(e)) {
            const matchs = e.match(/^(\w+)\[(\w+)\]$/);
            const field1 = matchs[1];
            const field2 = matchs[2];
            const index = fieldArr.indexOf(e);
            fieldArr.splice(index, 1, field1, field2);
        }
    })
    return fieldArr.reduce((pre, cur) => {
        const target = pre[cur] || def;

        if(target instanceof Array) {
            return [].concat(target);
        }
        if(target instanceof Object) {
            return Object.assign({}, target)
        }
        return target;
    }, obj)
}
// var c = {a: {b : [1,2,3] }}
// get(c ,'a.b')     // [1,2,3]
// get(c, 'a.b[1]')  // 2
// get(c, 'a.d', 12)  // 12