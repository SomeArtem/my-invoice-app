import './style.css';
import viteLogo from '/vite.svg';
import DOM from './utils/keys';
import Popup from './Components/Popup';


const createBtn=document.getElementById('create-button');
const app=document.querySelector(`[data-id='${DOM.others.APP}']`);

createBtn.addEventListener('click',()=>{
  createPopup('Create');  
});

function createPopup(callerName){
  let myPopup=new Popup(callerName,closePopupCallback);
  myPopup.render(app);
  // myPopup.style.display='flex';
}
function closePopupCallback(){
  app.lastChild.remove();
}



