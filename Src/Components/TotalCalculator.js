import State2 from "../Utilites/data";//!!!!!!!!!!!!!!!!!
import DOM from "../Utilites/keys";

export default class TotalCalculator {
    #state = new State2('TableItems');
    #discountCall;

    constructor(discountCall) {
        this.#discountCall = discountCall;
    }
    render(ElemToInsert) {

        const itemMarkup = `
        <div data-id="${DOM.others.TOTAL_CALCULATIONS}" class="total__calcucations" style="background-color: crimson;">
            <div>Предрасчёт: <span data-id="${DOM.others.SUBTOTAL}"></span> </div>
            <div>Скидка: <input type="text" name="${DOM.others.DISCOUNT}" data-id="${DOM.others.DISCOUNT}"></div>
            <div>Налоги: <input type="text" name="${DOM.others.TAXES}" data-id="${DOM.others.TAXES}"></div>
            <div>Финально: <span data-id="${DOM.others.TOTALMAXIMA}"></span> </div>
        </div>
        `;
        const totalCalcElem = document.createElement('div');
        totalCalcElem.innerHTML = itemMarkup;

        const SubtotalOutput = totalCalcElem.querySelector(`[data-id="${DOM.others.SUBTOTAL}"]`);
        const DiscountInput = totalCalcElem.querySelector(`[data-id="${DOM.others.DISCOUNT}"]`);
        const TaxesInput = totalCalcElem.querySelector(`[data-id="${DOM.others.TAXES}"]`);
        const TotalOutput = totalCalcElem.querySelector(`[data-id="${DOM.others.TOTALMAXIMA}"]`);




        let subtotalCalculate =()=>{
            let items = this.#state.getData() ? this.#state.getData() : [];
            let sum = 0;
            if (items.length > 0) {
                items.forEach(item => sum += item.total);
            }
            return sum;
        }        

        let subtotalVal=subtotalCalculate();
        SubtotalOutput.innerHTML = subtotalVal;
        TotalOutput.innerHTML = (subtotalVal * (1 - this.#state.getDiscount() / 100))*(1+this.#state.getTaxes()/100); //sum * (1 - this.#discount / 100);

        DiscountInput.value = this.#state.getDiscount();
        TaxesInput.value = this.#state.getTaxes();


        DiscountInput.onkeyup = (e) => {
            let newValue=e.target.value;
            this.#state.setDiscount(newValue);
            let currentTaxes=this.#state.getTaxes()?this.#state.getTaxes():0;
            console.log('currentTaxes', currentTaxes);
            TotalOutput.innerHTML = (subtotalCalculate() * (1 - newValue / 100))*(1+currentTaxes/100);
        }

        TaxesInput.onkeyup = (e) => {
            let newValue=e.target.value;
            this.#state.setTaxes(newValue);
            let currentDiscount=this.#state.getDiscount()?this.#state.getDiscount():0;
            TotalOutput.innerHTML = (subtotalCalculate() * (1 - currentDiscount / 100))*(1+newValue/100);
        }

        ElemToInsert.appendChild(totalCalcElem);
    }
    refreshTotals() {
        const SubtotalOutput = document.querySelector(`[data-id="${DOM.others.SUBTOTAL}"]`);
        const TotalOutput = document.querySelector(`[data-id="${DOM.others.TOTALMAXIMA}"]`);

        let items = this.#state.getData();
        let sum = 0;
        items.forEach(item => sum += item.total);

        let currentDiscount=this.#state.getDiscount()?this.#state.getDiscount():0;
        let currentTaxes=this.#state.getTaxes()?this.#state.getTaxes():0;

        SubtotalOutput.innerHTML = sum;
        TotalOutput.innerHTML = (sum * (1 - currentDiscount / 100))*(1+currentTaxes/100);
    }
}