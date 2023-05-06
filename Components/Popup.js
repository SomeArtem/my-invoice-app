class Popup{
    #callName;
    #closeCallback;
    constructor(callName,closeCallback){
      this.#callName=callName;
      this.#closeCallback=closeCallback;    
    }
    render(ElemToInsert){      
      let div=document.createElement('div');      
      const template=`    
      <div class="popup_controls">
        <button>Delete</button>
        <button data-id="close-button">close</button>
      </div>
      <div class="popup_inputs">
        <h1>Add</h1>
        <input data-id="invoice-num-input" type="text" name="">
        <div>
          <span>Qty:</span>
          <input data-id="quantity-input" type="text" name="" id="">
        </div>
        <div>
          <span>Cost: $</span>
          <input data-id="cost-input" type="text" name="" id="">
        </div>
        <div>Total: <span data-id="total-display">12$</span></div>
        <button data-id="confirm-button">${this.#callName}</button>
      </div>
      <div>
        <div style="display: flex; flex-direction: column;">
          Work item:
          <input data-id="title-input" type="text" name="" id="" placeholder="Enter title of the work item">
        </div>
        <div style="display: flex; flex-direction: column;">
          Description:
          <textarea data-id="description-input" name="" id="" cols="30" rows="10" placeholder="Write what this work item about"></textarea>
        </div>
      </div>
      `;
  
      div.innerHTML=template;
      const closeBtn = div.querySelector('[data-id="close-button"]');
      closeBtn.onclick=()=>{
        this.#closeCallback();
      }
      div.setAttribute('data-id','popup');
      div.setAttribute('class','popup');
      ElemToInsert.appendChild(div);
    }
  }

  export default Popup;