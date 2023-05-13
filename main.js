import './style.css';
import viteLogo from '/vite.svg';
import DOM from './Src/Utilites/keys';
import Popup from './Src/Components/Popup';
import TableItem from './Src/Components/TableItem';
import State from './Src/Utilites/data';


const createBtn=document.querySelector(`[data-id='${DOM.others.CREATE_BUTTON}'`);
const table=document.querySelector(`[data-id='${DOM.others.TABLE}'`);
const app=document.querySelector(`[data-id='${DOM.others.APP}']`);

const state=new State('TableItems');
let localdata=state.getData();//массив


renderData(localdata);

[createBtn].forEach(Btn => {
  Btn.addEventListener('click',(e)=>{
    console.dir(e.target)  
    createPopup(e.target.dataset.info);
  });  
});

function createPopup(callerName){
  let myPopup=new Popup(callerName,closePopupCallback, confirmPopupCallback);
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
}

function renderData(dataToRender){
  table.innerHTML='';
  dataToRender.forEach(element => {
    const tableItem=new TableItem(element);
    tableItem.render(table);    
  });
}


