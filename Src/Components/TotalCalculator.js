import State from "../Utilites/data";
import DOM from "../Utilites/keys";

export default class TotalCalculator{
    #subtotal
    #discount=0;
    #state=new State('TableItems');
    #discountCall
    

    constructor(discountCall){
        this.#discountCall=discountCall;
    }

    

    render(ElemToInsert){

        const itemMarkup=`
        <div data-id="${DOM.others.TOTAL_CALCULATIONS}" class="total__calcucations" style="background-color: crimson;">
            <div>Предрасчёт: <span data-id="${DOM.others.SUBTOTAL}"></span> </div>
            <div>Скидка: <input type="text" name="${DOM.others.DISCOUNT}" data-id="${DOM.others.DISCOUNT}"> </div>
            <div>Финально: <span data-id="${DOM.others.TOTALMAXIMA}"></span> </div>
        </div>
        `;
        const totalCalcElem=document.createElement('div');
        totalCalcElem.innerHTML=itemMarkup;

        const SubtotalOutput = totalCalcElem.querySelector(`[data-id="${DOM.others.SUBTOTAL}"]`);
        const DiscountInput = totalCalcElem.querySelector(`[data-id="${DOM.others.DISCOUNT}"]`);
        const TotalOutput = totalCalcElem.querySelector(`[data-id="${DOM.others.TOTALMAXIMA}"]`);

        let items=this.#state.getData();
        let sum=0;
        items.forEach(item => sum+=item.total)
        SubtotalOutput.innerHTML=sum;
        TotalOutput.innerHTML=sum*(1-this.#discount/100);

        DiscountInput.onkeyup=(e)=>{
            // discontchanged();//func?
            this.#discount=e.target.value;
            console.log(e.target.value);
            TotalOutput.innerHTML=sum*(1-this.#discount/100);
        }





        ElemToInsert.appendChild(totalCalcElem);
    }
    refreshTotals(){
        const SubtotalOutput = document.querySelector(`[data-id="${DOM.others.SUBTOTAL}"]`);
        const TotalOutput = document.querySelector(`[data-id="${DOM.others.TOTALMAXIMA}"]`);

        let items=this.#state.getData();
        let sum=0;
        items.forEach(item => sum+=item.total);
        
        SubtotalOutput.innerHTML=sum;
        TotalOutput.innerHTML=sum*(1-this.#discount/100);
    }
}