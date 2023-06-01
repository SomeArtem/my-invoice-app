class State2 {
    #LocalStorageKey
    #DataObject = {};
    constructor(LocalStorageKey) {
        this.#LocalStorageKey = LocalStorageKey;
    }
    getData() {
        // let rawdataObject = localStorage.getItem(this.#LocalStorageKey);
        // this.#DataObject = rawdataObject ? JSON.parse(rawdataObject) : { items: [], discount: null, taxes: null, invoiceid: null};
        // return this.#DataObject.items;

        //Это первое обращение? тогда
        let rawdataObject = localStorage.getItem(this.#LocalStorageKey);

        if(rawdataObject){
            this.#DataObject = JSON.parse(rawdataObject);
            console.log('getData ВЫПОЛНИЛСЯ THEN');            
        } else{
            this.#DataObject = { items: [], discount: null, taxes: null, invoiceid: null};
            let ddddattta = JSON.stringify(this.#DataObject);
            localStorage.setItem(this.#LocalStorageKey, ddddattta);
            console.log('getData ВЫПОЛНИЛСЯ ELSE');
        }
        return this.#DataObject.items;        
    }
    addItem(item) {
        this.#DataObject = JSON.parse(localStorage.getItem(this.#LocalStorageKey));//asfasffasfasf
        this.#DataObject.items.push(item);
        let ddddattta = JSON.stringify(this.#DataObject);
        localStorage.setItem(this.#LocalStorageKey, ddddattta);
    }
    findItemById(id) {
        return this.#DataObject.items.find(item => item.itemId == id);
    }
    editItem(item) {
        let el = this.findItemById(item.itemId);
        let index = this.#DataObject.items.indexOf(el);
        this.#DataObject.items[index] = item;
        console.log('меняем ', index);
        let ddddattta = JSON.stringify(this.#DataObject);
        localStorage.setItem(this.#LocalStorageKey, ddddattta);
    }
    deleteItemById(id) {
        this.#DataObject.items = this.#DataObject.items.filter(item => item.itemId != id);
        let ddddattta = JSON.stringify(this.#DataObject);
        localStorage.setItem(this.#LocalStorageKey, ddddattta);
    }    

    setDiscount(val) {
        this.#DataObject.discount = val;
        let ddddattta = JSON.stringify(this.#DataObject);
        localStorage.setItem(this.#LocalStorageKey, ddddattta);
        console.log('setDiscount отработал',this.#DataObject.discount);
    }
    getDiscount() {
        console.log('getDiscount вернул ', this.#DataObject.discount);
        return this.#DataObject.discount;
    }
    setTaxes(val) {
        this.#DataObject.taxes = val;
        let ddddattta = JSON.stringify(this.#DataObject);
        localStorage.setItem(this.#LocalStorageKey, ddddattta);
        console.log('setTaxes отработал',this.#DataObject.taxes);
    }
    getTaxes() {
        console.log('getTaxes вернул ', this.#DataObject.taxes);
        return this.#DataObject.taxes;
    }

}

export default State2;//!!!!!!!!!!!!!!!!!!!!!!!!!!!


