class State{
    #LocalStorageKey
    #DataArray=[];
    constructor(LocalStorageKey){
        this.#LocalStorageKey=LocalStorageKey;
    }
    getData(){
        let rawdata=localStorage.getItem(this.#LocalStorageKey);
        this.#DataArray = (rawdata)? JSON.parse(rawdata):[];
        return this.#DataArray;
    }
    addItem(item){
        this.#DataArray.push(item);
        let ddddattta=JSON.stringify(this.#DataArray)
        localStorage.setItem(this.#LocalStorageKey,ddddattta);
    }
    findItem(id){
        return this.#DataArray.find(item=>item.itemId==id)
    }
    UpdateData(id){
        console.log();
    }
    DeleteData(id){
        console.log();
    }
}

export default State;


