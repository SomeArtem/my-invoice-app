import State2 from "../Utilites/data";//!!!!!!!!!!!!!!!!!
import DOM from "../Utilites/keys";
import validation from "../Utilites/validation";

export default class TotalCalculator {
    #state = new State2('TableItems');
    #discountCall;

    constructor(discountCall) {
        this.#discountCall = discountCall;
    }
    render(ElemToInsert) {

        const itemMarkup = `
        <div data-id="${DOM.others.TOTAL_CALCULATIONS}" class="total__calcucations">
            <div>Предрасчёт: <span data-id="${DOM.others.SUBTOTAL}"></span> </div>
            <div>Скидка: <input type="text" name="${DOM.others.DISCOUNT}" data-id="${DOM.others.DISCOUNT}"> <span data-id="${DOM.others.DISCOUNTDISP}">-</span></div>
            <div>Налоги: <input type="text" name="${DOM.others.TAXES}" data-id="${DOM.others.TAXES}"> <span data-id="${DOM.others.TAXESDISP}">-</span></div>
            <div>Финально: <span data-id="${DOM.others.TOTALMAXIMA}"></span> </div>
        </div>
        `;
        const totalCalcElem = document.createElement('div');
        totalCalcElem.innerHTML = itemMarkup;
        totalCalcElem.classList.add('total__calcucations_wrap')

        const SubtotalOutput = totalCalcElem.querySelector(`[data-id="${DOM.others.SUBTOTAL}"]`);
        const DiscountInput = totalCalcElem.querySelector(`[data-id="${DOM.others.DISCOUNT}"]`);
        const DiscountOutput = totalCalcElem.querySelector(`[data-id="${DOM.others.DISCOUNTDISP }"]`);
        const TaxesInput = totalCalcElem.querySelector(`[data-id="${DOM.others.TAXES}"]`);
        const TaxesOutput = totalCalcElem.querySelector(`[data-id="${DOM.others.TAXESDISP}"]`);
        const TotalOutput = totalCalcElem.querySelector(`[data-id="${DOM.others.TOTALMAXIMA}"]`);
      

        let subtotalVal=this.subtotalCalculate2();//asvasvasvasvasv
        let discountfromstate=this.#state.getDiscount();
        let taxesfromstate=this.#state.getTaxes();

        SubtotalOutput.innerHTML = subtotalVal;
        TotalOutput.innerHTML = (subtotalVal * (1 - discountfromstate / 100))*(1+taxesfromstate/100); //sum * (1 - this.#discount / 100);

        DiscountInput.value = discountfromstate;
        TaxesInput.value = taxesfromstate;
        let discountvalue=this.DiscountsCalculate();
        DiscountOutput.innerHTML=discountvalue;//ТУУУУУУУТ        
        TaxesOutput.innerHTML=(subtotalVal-discountvalue)*taxesfromstate*0.01;//ТУУУУУУУТ


        DiscountInput.oninput = (e) => {
            let newValue=e.target.value;
            let validNum=validation.isNum(newValue);
            e.target.value=validNum;
            this.#state.setDiscount(validNum);
            let currentTaxes=this.#state.getTaxes()?this.#state.getTaxes():0;
            console.log('currentTaxes', currentTaxes);
            TotalOutput.innerHTML = (this.subtotalCalculate2() * (1 - validNum / 100))*(1+currentTaxes/100);

            this.refreshDiscounts();
            this.refreshTaxes();
        }

        TaxesInput.oninput = (e) => {
            let newValue=e.target.value;
            let validNum=validation.isNum(newValue);
            e.target.value=validNum;
            this.#state.setTaxes(validNum);
            let currentDiscount=this.#state.getDiscount()?this.#state.getDiscount():0;
            TotalOutput.innerHTML = (this.subtotalCalculate2() * (1 - currentDiscount / 100))*(1+validNum/100);

            this.refreshTaxes();
            this.refreshDiscounts();
        }

        ElemToInsert.appendChild(totalCalcElem);
    }

    
    subtotalCalculate2 (){
        let itemsFromState=this.#state.getData();
        let items = itemsFromState ? itemsFromState : [];
        let sum = 0;
        if (items.length > 0) {
            items.forEach(item => sum += item.total);
        }
        return sum;
    }

    totalCalculate(){
        let sum = this.subtotalCalculate2();
        let discount = this.DiscountsCalculate();
        let taxes = this.TaxesCalculate();
        let result = sum - discount + taxes;
        return result
    }

    DiscountsCalculate(){
        let discountFromState=this.#state.getDiscount();
        let currentDiscount=discountFromState?discountFromState:0;
        let sum = this.subtotalCalculate2();
        let result = sum * currentDiscount * 0.01;
        return result;  
    }

    TaxesCalculate(){
        let taxesfromstate = this.#state.getTaxes();
        let currentTaxes = taxesfromstate?taxesfromstate:0;
        let sum = this.subtotalCalculate2();
        let currentDiscount = this.DiscountsCalculate();
        let valAfterDiscount = sum - currentDiscount;
        let result = valAfterDiscount*currentTaxes*0.01;
        return result;  
    }


    refreshTotals() {
        const SubtotalOutput = document.querySelector(`[data-id="${DOM.others.SUBTOTAL}"]`);
        const TotalOutput = document.querySelector(`[data-id="${DOM.others.TOTALMAXIMA}"]`);

        SubtotalOutput.innerHTML = this.subtotalCalculate2();
        TotalOutput.innerHTML = this.totalCalculate();
    }

    refreshDiscounts(){
        const DiscountOutput = document.querySelector(`[data-id="${DOM.others.DISCOUNTDISP }"]`);
        let discountVal=this.DiscountsCalculate();
        DiscountOutput.innerHTML=`${discountVal}`;
    }

    refreshTaxes(){
        const TaxesOutput = document.querySelector(`[data-id="${DOM.others.TAXESDISP}"]`);
        let taxesVal=this.TaxesCalculate();
        TaxesOutput.innerHTML=`${taxesVal}`;
    }
}