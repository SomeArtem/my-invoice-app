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
        let ddddattta=JSON.stringify(this.#DataArray);
        localStorage.setItem(this.#LocalStorageKey,ddddattta);
    }
    findItemById(id){
        return this.#DataArray.find(item=>item.itemId==id)
    }
    UpdateData(id){
        console.log();
    }
    deleteItemById(id){
        //console.log(`сработало удаление по id ${id} из store`);
        //let itemToDelete=this.findItemById(id);
        //console.log(itemToDelete);


        this.#DataArray=this.#DataArray.filter(item=>item.itemId!=id);
        let ddddattta=JSON.stringify(this.#DataArray);
        localStorage.setItem(this.#LocalStorageKey,ddddattta);
    }
}

export default State;


