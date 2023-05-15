import './style.css';
import viteLogo from '/vite.svg';
import DOM from './Src/Utilites/keys';
import Popup from './Src/Components/Popup';
import TableItem from './Src/Components/TableItem';
import State from './Src/Utilites/data';
import TotalCalculator from './Src/Components/TotalCalculator';


const createBtn=document.querySelector(`[data-id='${DOM.others.CREATE_BUTTON}'`);
const table=document.querySelector(`[data-id='${DOM.others.TABLE}'`);
const app=document.querySelector(`[data-id='${DOM.others.APP}']`);




let calculator=new TotalCalculator(discountChangedCall);
calculator.render(app);




const state=new State('TableItems');
let localdata=state.getData();//массив
renderData(localdata);

[createBtn].forEach(Btn => {
  Btn.addEventListener('click',(e)=>{
    console.dir(e.target)  
    renderPopup(e.target.dataset.info,{}); 
  });  
});

function renderPopup(callerName, itemToChange){
  let myPopup=new Popup(callerName,closePopupCallback, confirmPopupCallback, deletePopupCallback, itemToChange);
  myPopup.render(app);
}

function closePopupCallback(){
  app.lastChild.remove();
}

function confirmPopupCallback(item){
  state.addItem(item);
  let puk=state.getData();
  renderData(puk);
  closePopupCallback();

  calculator.refreshTotals();
}

function deletePopupCallback(id) {
  state.deleteItemById(id);
  let puk=state.getData();
  renderData(puk);
  closePopupCallback();
}

function itemCallback(id) {
  //console.log(id);
  let itemFromState=state.findItemById(id);
  console.dir(itemFromState);
  renderPopup('Изменить', itemFromState);
}

function renderData(dataToRender){
  table.innerHTML='';
  dataToRender.forEach(element => {
    const tableItem=new TableItem(element, itemCallback);
    tableItem.render(table);    
  });
}

function discountChangedCall() {
    
}

