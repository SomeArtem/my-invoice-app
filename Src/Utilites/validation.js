// class validation{
//     static isNumber(inputValue){
//         if(inputValue!=0){
//             return Number(inputValue)?Number(inputValue):'';
//         } else return 0;        
//     }
// }

// export default validation;

export default class validation{
    static isNum(val){
        let result;
        let lastChar=val[val.length - 1];
        result = Number(lastChar) || lastChar==0 ? val : val.slice(0,val.length-1);
        return result.trim();
    }

    static isLength(val,max){
        let result;
        result = val.length>max ? val.slice(0,val.length-1) : val;
        return result.trim();
    }

    static isObjValid(item){
        console.log('item.title: ',item.title.length);
        let result=false;       
        if(item.title.length > 0 && item.total > 0){
            result=true;
        }        
        return result;
    }
}