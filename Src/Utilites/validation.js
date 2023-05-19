class validation{
    static isNumber(inputValue){
        if(inputValue!=0){
            return Number(inputValue)?Number(inputValue):'';
        } else return 0;        
    }
}

export default validation;