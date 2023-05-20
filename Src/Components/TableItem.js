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
        <div>${this.title}</div>
        <div>${this.description}</div>
        <div>${this.quantity}</div>
        <div>${this.cost}</div>
        <div>${this.total}</div>
        <div style="display:none">${this.itemId}</div>
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