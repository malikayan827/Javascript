const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn=document.getElementById('clear');
function addItem(e){
    const newItemText = itemInput.value;
    e.preventDefault();
    //validate
    if(newItemText === ''){
  alert('please enter a value');
  return;
    }
    //list item

   const li=document.createElement('li');
   li.appendChild(document.createTextNode(newItemText));
   const button= createButton('remove-item btn-link text-red');
   li.appendChild(button);
    itemList.appendChild(li);
    itemInput.value='';

};
function createButton(cssClass){
    const button = document.createElement('button');
    button.className=cssClass;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}
function createIcon(cssClass){
    const icon = document.createElement('i');
    icon.className=cssClass;
    
    return icon;
}
function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')) {
        e.target.parentElement.parentElement.remove();
    }
    
}
function clearItem(e){
  while(itemList.firstChild){
      itemList.removeChild(itemList.firstChild);
  }
}

//events
itemForm.addEventListener('submit',addItem);
itemList.addEventListener('click',removeItem);
clearBtn.addEventListener('click',clearItem);

