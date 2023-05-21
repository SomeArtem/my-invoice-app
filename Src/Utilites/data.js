// class State {
//     #LocalStorageKey
//     #DataArray = [];
//     constructor(LocalStorageKey) {
//         this.#LocalStorageKey = LocalStorageKey;
//     }
//     getData() {
//         let rawdata = localStorage.getItem(this.#LocalStorageKey);
//         this.#DataArray = (rawdata) ? JSON.parse(rawdata) : [];
//         return this.#DataArray;
//     }
//     addItem(item) {
//         this.#DataArray.push(item);
//         let ddddattta = JSON.stringify(this.#DataArray);
//         localStorage.setItem(this.#LocalStorageKey, ddddattta);
//     }
//     findItemById(id) {
//         return this.#DataArray.find(item => item.itemId == id);
//     }
//     editItem(item) {
//         //console.log('editItem');
//         let el = this.findItemById(item.itemId);
//         let index = this.#DataArray.indexOf(el);
//         this.#DataArray[index] = item;
//         let ddddattta = JSON.stringify(this.#DataArray);
//         localStorage.setItem(this.#LocalStorageKey, ddddattta);
//         console.log('editItem');
//     }
//     deleteItemById(id) {
//         //console.log(`сработало удаление по id ${id} из store`);
//         //let itemToDelete=this.findItemById(id);
//         //console.log(itemToDelete);


//         this.#DataArray = this.#DataArray.filter(item => item.itemId != id);
//         let ddddattta = JSON.stringify(this.#DataArray);
//         localStorage.setItem(this.#LocalStorageKey, ddddattta);
//     }
// }

class State2 {
    #LocalStorageKey
    #DataObject = {};
    constructor(LocalStorageKey) {
        this.#LocalStorageKey = LocalStorageKey;
    }
    getData() {
        let rawdataObject = localStorage.getItem(this.#LocalStorageKey);
        this.#DataObject = rawdataObject ? JSON.parse(rawdataObject) : { id: null, items: [], discount: null, taxes: null };
        return this.#DataObject.items;
    }
    addItem(item) {
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
    }
    getDiscount() {
        console.log('getDiscount вернул ', this.#DataObject.discount);
        return this.#DataObject.discount;
    }
    setTaxes(val) {
        this.#DataObject.taxes = val;
        let ddddattta = JSON.stringify(this.#DataObject);
        localStorage.setItem(this.#LocalStorageKey, ddddattta);
    }
    getTaxes() {
        console.log('getTaxes вернул ', this.#DataObject.taxes);
        return this.#DataObject.taxes;
    }
}

export default State2;//!!!!!!!!!!!!!!!!!!!!!!!!!!!


