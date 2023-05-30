import DOM from "../Utilites/keys";
import validation from "../Utilites/validation";

export default class Idinput {   

    constructor() {        
    }
    render(ElemToInsert) {
        const itemMarkup = `        
        <input type="text" name="${DOM.others.INVOICEIDINP}" data-id="${DOM.others.INVOICEIDINP}">
        `;
        const IdInpContainer = document.createElement('span');
        IdInpContainer.innerHTML = itemMarkup;
        IdInpContainer.classList.add('id__input');

        const SubtotalOutput = IdInpContainer.querySelector(`[data-id="${DOM.others.INVOICEIDINP}"]`);

        let invIdVal=localStorage.getItem('invoiceId');
        SubtotalOutput.value = invIdVal;
        

        SubtotalOutput.oninput = (e) => {
            let newValue=e.target.value;
            newValue=validation.isNum(newValue);
            newValue=validation.isLength(newValue,3);
            e.target.value=newValue;
            localStorage.setItem('invoiceId',newValue);
        }

        ElemToInsert.appendChild(IdInpContainer);
    }
}