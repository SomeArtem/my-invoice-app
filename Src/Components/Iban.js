import DOM from "../Utilites/keys";
import validation from "../Utilites/validation";

export default class Iban {   

    constructor() {        
    }
    render(ElemToInsert) {
        const itemMarkup = `        
        <input type="text" name="${DOM.others.IBANINP}" data-id="${DOM.others.IBANINP}">
        `;
        const IbanContainer = document.createElement('span');
        IbanContainer.innerHTML = itemMarkup;
        IbanContainer.children[0].classList.add('iban__input');

        const ibanElem = IbanContainer.querySelector(`[data-id="${DOM.others.IBANINP}"]`);

        let ibanVal=localStorage.getItem('iban');
        ibanElem.value = ibanVal;
        

        ibanElem.oninput = (e) => {
            let newValue=e.target.value;
            newValue=validation.isLength(newValue,30);
            e.target.value=newValue;
            localStorage.setItem('iban',newValue);
        }

        ElemToInsert.appendChild(IbanContainer);
    }
}