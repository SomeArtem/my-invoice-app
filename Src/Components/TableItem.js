class TableItem {
    title
    description
    quantity
    cost
    total
    itemId
    clickhandler
    constructor(prop, clickhandler) {
        this.title = prop.title;
        this.description = prop.description;
        this.quantity = prop.quantity;
        this.cost = prop.cost;
        this.total = prop.total;
        this.itemId = prop.itemId;
        this.clickhandler = clickhandler;
    }
    render(ElemToInsert) {
        const itemMarkup = `
        <div class="table__credentials">
            <div class="table__title"><p>${this.title}</p></div>
            <div class="table__description"><p>${this.description}</p></div>
        </div>
        <div class="table__qty"><p>${this.quantity}</p></div>
        <div class="table__qty"><p>${this.cost}</p></div>
        <div class="table__total"><p>${this.total}</p></div>
        <div style="display:none"><p>${this.itemId}</p></div>
        `
        const tableItem = document.createElement('div');
        tableItem.innerHTML = itemMarkup;
        tableItem.addEventListener('click', () => {
            this.clickkk(this.itemId);
        })

        tableItem.classList.add('table__item')
        ElemToInsert.appendChild(tableItem);
    }
    clickkk(id) {
        this.clickhandler(id);
        console.log('clickkk id: ', id)
    }
}

export default TableItem;