const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const formBtn=itemForm.querySelector("button");
const itemFilter = document.getElementById("filter");
let isEditMode = false;
function ononaddItemsubmit(e) {
  const newItemText = itemInput.value;
  e.preventDefault();
  //validate
  if (newItemText === "") {
    alert("please enter a value");
    return;
  }
  //check for edit
  if(isEditMode){
    if(checkifItemExist(newItemText)){
      alert("Item already exist");
      return;
    }
    else{
    const editItem=itemList.querySelector(".edit-mode");
    removeItemFromStorage(editItem.textContent);
    editItem.classList.remove("edit-mode");
    editItem.remove();
    isEditMode=false;}

  }else{
    if(checkifItemExist(newItemText)){
      alert("Item already exist");
      return;
    }
  }
  //create new item dom element

  addItemToDom(newItemText);
  //add item to storage
  addItemtoStorage(newItemText);
  checkUI();
  itemInput.value = "";
}
function addItemToDom(item) {
  //list item

  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  // add lis to Dom

  itemList.appendChild(li);
}
function addItemtoStorage(item) {
  let items = getItemFromStorage();

  items.push(item);
  //covert to json
  localStorage.setItem("items", JSON.stringify(items));
}
function getItemFromStorage() {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }

  return items;
}
function displayItems() {
  const items = getItemFromStorage();
  for (let i = 0; i < items.length; i++) {
    addItemToDom(items[i]);
  }
  checkUI();
}
function createButton(cssClass) {
  const button = document.createElement("button");
  button.className = cssClass;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}
function createIcon(cssClass) {
  const icon = document.createElement("i");
  icon.className = cssClass;

  return icon;
}
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    onClickRemove(e.target.parentElement.parentElement);
  }
  else{
    setItemToEdit(e.target);

  }
}
function setItemToEdit(item) {
  isEditMode = true;
  
itemList.querySelectorAll("li").forEach((i) => {
    i.classList.remove("edit-mode");

});
  item.classList.add("edit-mode");
  formBtn.innerHTML= '<i class="fa-solid fa-pen"></i>Update Item';
  formBtn.style.backgroundColor="green";
  itemInput.value = item.textContent;
}
function onClickRemove(item) {
  if (confirm("Are you sure?")) {
    item.remove();
    //remove from storage
    removeItemFromStorage(item.textContent);
    checkUI();
  }
}
function removeItemFromStorage(item) {
  let items = getItemFromStorage();
  items = items.filter((i) => i !== item);
  localStorage.setItem("items", JSON.stringify(items));
}
function clearItem(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  //clear from storage
  localStorage.removeItem("items");
  checkUI();
}
function checkifItemExist(item) {
  const items=getItemFromStorage();
  if(items.includes(item)){
    return true;

  }else{
    return false;
  }
}
function checkUI() {
  itemInput.value = "";
  const Items = itemList.querySelectorAll("li");
  console.log(Items);
  if (Items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";

  }
  formBtn.innerHTML= '<i class="fa-solid fa-plus"></i>Add Item';
  formBtn.style.backgroundColor="black";
  isEditMode=false;
}

//events
function init() {
  itemForm.addEventListener("submit", ononaddItemsubmit);
  itemList.addEventListener("click", removeItem);
  clearBtn.addEventListener("click", clearItem);
  document.addEventListener("DOMContentLoaded", displayItems);
  checkUI();
}
init();
