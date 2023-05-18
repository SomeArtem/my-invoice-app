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
        return this.#DataArray.find(item=>item.itemId==id);
    }
    editItem(item){
        //console.log('editItem');
        let el=this.findItemById(item.itemId);
        let index=this.#DataArray.indexOf(el);
        this.#DataArray[index]=item;
        let ddddattta=JSON.stringify(this.#DataArray);
        localStorage.setItem(this.#LocalStorageKey,ddddattta);
        console.log('editItem');        
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


