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
        <button data-id="${DOM.popup.controls.CLOSE_BUTTON}">Закрыть</button>
      </div>
      <div class="popup_inputs">
        <h1>${this.#callName}</h1>
        <!--<input data-id="invoice-num-input" type="text" name="">-->
        <div>
          <span>Количество:</span>
          <input data-id="${DOM.popup.inputs.QUANTITY_INPUT}" type="text" name="" id="" value="${this.#item.quantity ? this.#item.quantity : ''}">
        </div>
        <div>
          <span>Стоимость: $</span>
          <input data-id="${DOM.popup.inputs.COST_INPUT}" type="text" name="" id="" value="${this.#item.cost ? this.#item.cost : ''}">
        </div>
        <div>Суммарно: <span data-id="total-display">${this.#item.total ? this.#item.total : '0'}$</span></div>
        <button data-id="${DOM.popup.controls.CONFIRM_BUTTON}" disabled>${this.#callName} ${this.#item.itemId ? this.#item.itemId : ''}</button>
      </div>
      <div>
        <div style="display: flex; flex-direction: column;">
          Наименование работ:
          <input data-id="${DOM.popup.inputs.TITLE_INPUT}" type="text" name="" id="" placeholder="Enter title of the work item" value="${this.#item.title ? this.#item.title : ''}">
        </div>
        <div style="display: flex; flex-direction: column;">
          Описание:
          <textarea data-id="${DOM.popup.inputs.DESCRIPTION_INPUT}" name="" id="" cols="30" rows="10" placeholder="Write what this work item about"> ${this.#item.description ? this.#item.description : ''}</textarea>
        </div>
      </div>
      `;

    div.innerHTML = template;
    //получаем все контролсы
    const confirmBtn = div.querySelector(`[data-id="${DOM.popup.controls.CONFIRM_BUTTON}"]`);
    const closeBtn = div.querySelector(`[data-id="${DOM.popup.controls.CLOSE_BUTTON}"]`);
    const deleteBtn = div.querySelector(`[data-id="${DOM.popup.controls.DELETE_BUTTON}"]`);
    const titleInput = div.querySelector(`[data-id="${DOM.popup.inputs.TITLE_INPUT}"]`);
    const descriptionInput = div.querySelector(`[data-id="${DOM.popup.inputs.DESCRIPTION_INPUT}"]`);
    const costInput = div.querySelector(`[data-id="${DOM.popup.inputs.COST_INPUT}"]`);
    const quantityInput = div.querySelector(`[data-id="${DOM.popup.inputs.QUANTITY_INPUT}"]`);

    //вешаем все слушатели
    quantityInput.oninput = e => this.inphandler(e);
    costInput.oninput = e => this.inphandler(e);
    closeBtn.onclick = () => this.#closeCallback();
    deleteBtn.onclick = () => this.#deleteCallback(this.#item.itemId);
    titleInput.oninput=()=> this.readytosubmit();

    confirmBtn.onclick = () => {
      const confItem = {
        title: titleInput.value,
        description: descriptionInput.value,
        quantity: this.#privateqty,
        cost: this.#privatecost,
        total: this.#privatetotal,        
        itemId: this.#item.itemId ? this.#item.itemId : Date.now(),
      }
      this.#confirmCallback(confItem);
    }
    //вставляем попап в дом
    div.setAttribute('data-id', 'popup');
    div.classList.add('popup');
    ElemToInsert.appendChild(div);
  }

  inphandler(event) {
    let validNum=validation.isNum(event.target.value);
    let validValue=validation.isLength(validNum,8);
    event.target.value=validValue;      
    event.target.dataset.id==='quantity-input'?this.#privateqty=validValue:this.#privatecost=validValue;

    this.#privatetotal = this.#privateqty * this.#privatecost;
    let inps = event.target.parentNode.parentNode;
    let disp = inps.querySelector(`[data-id="${DOM.popup.outputs.TOTAL_DISPLAY}"]`);
    disp.innerText = this.#privatetotal + '$';
    const confirmBtn = inps.querySelector('[data-id="confirm-button"]');
    this.#privatetotal > 0 ? null : confirmBtn.setAttribute('disablded', 'disablded');
    this.readytosubmit();
  }

  readytosubmit(){
    //переключатель кнопки confirm
    const confirmBtn = document.querySelector(`[data-id="${DOM.popup.controls.CONFIRM_BUTTON}"]`);    
    const titleInput = document.querySelector(`[data-id="${DOM.popup.inputs.TITLE_INPUT}"]`);

    const confItem = {
      title: titleInput.value,
      quantity: this.#privateqty,
      cost: this.#privatecost,
      total: this.#privatetotal,        
      itemId: this.#item.itemId ? this.#item.itemId : Date.now(),
    }
    let validresult=validation.isObjValid(confItem);
    if (validresult){
      confirmBtn.removeAttribute('disabled');
    }else{
      confirmBtn.setAttribute('disabled','disabled');
    }
  }
}
export default Popup;