import './style.css';
import viteLogo from '/vite.svg';
import DOM from './Src/Utilites/keys';
import Popup from './Src/Components/Popup';
import TableItem from './Src/Components/TableItem';
import State2 from './Src/Utilites/data';//!!!!!!!!!!!!!!!!!!!!!!!!!!!
import TotalCalculator from './Src/Components/TotalCalculator';
import Idinput from './Src/Components/Idinput';

const createBtn = document.querySelector(`[data-id='${DOM.others.CREATE_BUTTON}'`);
const table = document.querySelector(`[data-id='${DOM.others.TABLE}'`);
const invoiceNumber = document.querySelector(`[data-id='${DOM.others.INVOICENUMTARGET}'`);
const app = document.querySelector(`[data-id='${DOM.others.APP}']`);


// const invoiceIdInput = document.querySelector(`[data-id='${DOM.others.INVOICEIDINP}'`);


let idinput=new Idinput();
idinput.render(invoiceNumber);

let calculator = new TotalCalculator(discountChangedCall);
calculator.render(app);

const state = new State2('TableItems');//!!!!!!!!!!!!!!!!!!!!!!!!!!!
let localdata = state.getData();//массив
renderData(localdata);

createBtn.addEventListener('click', (e) => {
  console.dir(e.target)
  renderPopup(e.target.dataset.info, {});
  hideControls();
});


//скрывает элементы управления когда открыт попап
function hideControls() {
  createBtn.setAttribute('disabled', 'disabled');
  let tableBlur = document.createElement('div');
  tableBlur.classList.add('sdhsdhseh')
  table.prepend(tableBlur);
}


//отображает попап, принимает название вызывающего элемента и изменяемый элемент
function renderPopup(callerName, itemToChange) {
  let myPopup = undefined;

  switch (callerName) {
    case 'Изменить':
      myPopup = new Popup(callerName, closePopupCallback, editPopupCallback, deletePopupCallback, itemToChange);

      break;

    case 'создать':
      myPopup = new Popup(callerName, closePopupCallback, confirmPopupCallback, deletePopupCallback, itemToChange);

      break;


    default:
      console.log('сработал default в функции renderPopup main.js');
      break;
  }



  // let myPopup=new Popup(callerName,closePopupCallback, confirmPopupCallback, deletePopupCallback, itemToChange);
  myPopup.render(app);
}

//закрывает попап (изымает последний элемент из app, исправить, удалять слушатели)
function closePopupCallback() {
  app.lastChild.remove();
  createBtn.removeAttribute('disabled');
  table.removeChild(table.children[0]);

}

//обрабатывает клик по кнопке подтверждения попапа
function confirmPopupCallback(item) {
  state.addItem(item);
  let puk = state.getData();
  closePopupCallback();
  renderData(puk);


  calculator.refreshTotals();
}

function editPopupCallback(item) {
  state.editItem(item);
  // console.log('editPopupCallback');
  // console.log(item);
  let puk = state.getData();
  closePopupCallback();
  renderData(puk);


  calculator.refreshTotals();
}

//обрабатывает клик по кнопке удаления попапа
function deletePopupCallback(id) {
  state.deleteItemById(id);
  let puk = state.getData();
  closePopupCallback();
  renderData(puk);

  calculator.refreshTotals();
}

//отображает переданный массив в виде элементов TableItem
function renderData(dataToRender) {
  table.innerHTML = '';
  dataToRender.forEach(element => {
    const tableItem = new TableItem(element, itemCallback);
    tableItem.render(table);
  });
}

//обрабатывает клик по элементам таблицы типа TableItem
function itemCallback(id) {
  //console.log(id);
  let itemFromState = state.findItemById(id);
  console.dir(itemFromState);
  renderPopup('Изменить', itemFromState);
  hideControls();
}

//пусто, обрабатывает вызов изменения процента скидки
function discountChangedCall() {

}

