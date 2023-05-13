class TableItem{
    title
    description
    quantity
    cost
    total
    constructor(prop){
        this.title=prop.title;
        this.description=prop.description;
        this.quantity=prop.quantity;
        this.cost=prop.cost;
        this.total=prop.total;
    }
    render(ElemToInsert){
        const itemMarkup=`
        <div>${this.title}</div>
        <div>${this.description}</div>
        <div>${this.quantity}</div>
        <div>${this.cost}</div>
        <div>${this.total}</div>
        `
        const tableItem=document.createElement('div');
        tableItem.innerHTML=itemMarkup;
        
        tableItem.classList.add('table__item')
        ElemToInsert.appendChild(tableItem);        
    }
}

export default TableItem;