import DOM from "../Utilites/keys";
import validation from "../Utilites/validation";

class Popup {
  #callName;
  #closeCallback;
  #confirmCallback;
  #deleteCallback;
  #item = null;//null!!!!!!
  #privatetotal
  #privatecost
  #privateqty
  constructor(callName, closeCallback, confirmCallback, deleteCallback, item) {//(callName,closeCallback, confirmCallback)
    this.#callName = callName;
    this.#closeCallback = closeCallback;
    this.#confirmCallback = confirmCallback;
    this.#deleteCallback = deleteCallback;
    this.#item = item;
    this.#privatecost = item.cost ? item.cost : 0;
    this.#privateqty = item.quantity ? item.quantity : 0;
  }
  render(ElemToInsert) {
    let div = document.createElement('div');
    const template = `    
      <div class="popup_controls">
        <button ${this.#item.itemId ? '' : 'disabled'} data-id="${DOM.popup.controls.DELETE_BUTTON}">Delete</button>
        <button data-id="${DOM.popup.controls.CLOSE_BUTTON}">close</button>
      </div>
      <div class="popup_inputs">
        <h1>${this.#callName}</h1>
        <!--<input data-id="invoice-num-input" type="text" name="">-->
        <div>
          <span>Qty:</span>
          <input data-id="${DOM.popup.inputs.QUANTITY_INPUT}" type="text" name="" id="" value="${this.#item.quantity ? this.#item.quantity : ''}">
        </div>
        <div>
          <span>Cost: $</span>
          <input data-id="${DOM.popup.inputs.COST_INPUT}" type="text" name="" id="" value="${this.#item.cost ? this.#item.cost : ''}">
        </div>
        <div>Total: <span data-id="total-display">${this.#item.total ? this.#item.total : '0'}$</span></div>
        <button data-id="${DOM.popup.controls.CONFIRM_BUTTON}">${this.#callName} ${this.#item.itemId ? this.#item.itemId : ''}</button>
      </div>
      <div>
        <div style="display: flex; flex-direction: column;">
          Work item:
          <input data-id="${DOM.popup.inputs.TITLE_INPUT}" type="text" name="" id="" placeholder="Enter title of the work item" value="${this.#item.title ? this.#item.title : ''}">
        </div>
        <div style="display: flex; flex-direction: column;">
          Description:
          <textarea data-id="${DOM.popup.inputs.DESCRIPTION_INPUT}" name="" id="" cols="30" rows="10" placeholder="Write what this work item about"> ${this.#item.description ? this.#item.description : ''}</textarea>
        </div>
      </div>
      `;

    div.innerHTML = template;
    const confirmBtn = div.querySelector(`[data-id="${DOM.popup.controls.CONFIRM_BUTTON}"]`);
    const closeBtn = div.querySelector(`[data-id="${DOM.popup.controls.CLOSE_BUTTON}"]`);
    const deleteBtn = div.querySelector(`[data-id="${DOM.popup.controls.DELETE_BUTTON}"]`);
    const titleInput = div.querySelector(`[data-id="${DOM.popup.inputs.TITLE_INPUT}"]`);

    const descriptionInput = div.querySelector(`[data-id="${DOM.popup.inputs.DESCRIPTION_INPUT}"]`);
    const costInput = div.querySelector(`[data-id="${DOM.popup.inputs.COST_INPUT}"]`);
    const quantityInput = div.querySelector(`[data-id="${DOM.popup.inputs.QUANTITY_INPUT}"]`);

    costInput.onkeydown = (e) => {
      if (e.key !== 'Enter' && e.key !== 'Backspace' && e.key !== 'Tab') {
        e.preventDefault();
        this.#privatecost = String(this.#privatecost) + String(validation.isNumber(e.key));
        console.log('costInput.onkeydown: ', e.key);
      }
    }

    costInput.onkeyup = (e) => {
      if (e.key !== 'Enter' && e.key !== 'Backspace' && e.key !== 'Tab') {
        costInput.value = this.#privatecost;
      } else {
        this.#privatecost = e.target.value;
      }
      this.inphandler(e);
    }
    quantityInput.onkeyup = (e) => {
      this.#privateqty = Number(e.target.value);
      this.inphandler(e);
    }

    closeBtn.onclick = () => {
      this.#closeCallback();
    }
    deleteBtn.onclick = () => {
      this.#deleteCallback(this.#item.itemId);
    }
    confirmBtn.onclick = () => {
      const confItem = {
        title: titleInput.value,
        description: descriptionInput.value,
        quantity: quantityInput.value,
        cost: costInput.value,
        total: Number(costInput.value) * Number(quantityInput.value),
        // itemId: Date.now(),
        itemId: this.#item.itemId ? this.#item.itemId : Date.now(),
      }
      this.#confirmCallback(confItem);
    }
    div.setAttribute('data-id', 'popup');
    div.classList.add('popup');
    ElemToInsert.appendChild(div);
  }

  inphandler(event) {

    this.#privatetotal = this.#privateqty * this.#privatecost;

    let inps = event.target.parentNode.parentNode;
    let disp = inps.querySelector(`[data-id="${DOM.popup.outputs.TOTAL_DISPLAY}"]`);
    disp.innerText = this.#privatetotal + '$';

    const confirmBtn = inps.querySelector('[data-id="confirm-button"]');
    this.#privatetotal > 0 ? null : confirmBtn.setAttribute('disablded', 'disablded');


    // let newValue=event.target.value;
    // let inps=event.target.parentNode.parentNode;
    // let disp=inps.querySelector(`[data-id="${DOM.popup.outputs.TOTAL_DISPLAY}"]`)
    // disp.innerText=newValue;

  }
}

export default Popup;