import DOM from "../Utilites/keys";
class Popup{
    #callName;
    #closeCallback;
    #confirmCallback;
    #item
    constructor(callName,closeCallback, confirmCallback,item){//(callName,closeCallback, confirmCallback)
      this.#callName=callName;
      this.#closeCallback=closeCallback;    
      this.#confirmCallback=confirmCallback;    
      this.#item=item;    
    }
    render(ElemToInsert){      
      let div=document.createElement('div');      
      const template=`    
      <div class="popup_controls">
        <button>Delete</button>
        <button data-id="${DOM.popup.controls.CLOSE_BUTTON}">close</button>
      </div>
      <div class="popup_inputs">
        <h1>Add</h1>
        <input data-id="invoice-num-input" type="text" name="">
        <div>
          <span>Qty:</span>
          <input data-id="${DOM.popup.inputs.QUANTITY_INPUT}" type="text" name="" id="" value="${this.#item.quantity?this.#item.quantity:''}">
        </div>
        <div>
          <span>Cost: $</span>
          <input data-id="${DOM.popup.inputs.COST_INPUT}" type="text" name="" id="">
        </div>
        <div>Total: <span data-id="total-display">12$</span></div>
        <button data-id="confirm-button">${this.#callName + this.#item.itemId}</button>
      </div>
      <div>
        <div style="display: flex; flex-direction: column;">
          Work item:
          <input data-id="${DOM.popup.inputs.TITLE_INPUT}" type="text" name="" id="" placeholder="Enter title of the work item">
        </div>
        <div style="display: flex; flex-direction: column;">
          Description:
          <textarea data-id="${DOM.popup.inputs.DESCRIPTION_INPUT}" name="" id="" cols="30" rows="10" placeholder="Write what this work item about"></textarea>
        </div>
      </div>
      `;
  
      div.innerHTML=template;
      const confirmBtn = div.querySelector('[data-id="confirm-button"]');
      const closeBtn = div.querySelector(`[data-id="${DOM.popup.controls.CLOSE_BUTTON}"]`);
      const titleInput = div.querySelector(`[data-id="${DOM.popup.inputs.TITLE_INPUT}"]`);
      const descriptionInput = div.querySelector(`[data-id="${DOM.popup.inputs.DESCRIPTION_INPUT}"]`);
      const costInput = div.querySelector(`[data-id="${DOM.popup.inputs.COST_INPUT}"]`);
      const quantityInput = div.querySelector(`[data-id="${DOM.popup.inputs.QUANTITY_INPUT}"]`);
      
      closeBtn.onclick=()=>{
        this.#closeCallback();
      }
      confirmBtn.onclick=()=>{
        const confItem={
          title: titleInput.value,
          description: descriptionInput.value,
          quantity:  quantityInput.value,
          cost: costInput.value,
          total: 'total',
          itemId: Date.now(),
        }
        this.#confirmCallback(confItem);
      }
      div.setAttribute('data-id','popup');
      div.classList.add('popup');
      ElemToInsert.appendChild(div);
    }
  }

  export default Popup;