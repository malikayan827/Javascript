const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function ononaddItemsubmit(e) {
  const newItemText = itemInput.value;
  e.preventDefault();
  //validate
  if (newItemText === "") {
    alert("please enter a value");
    return;
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
}
function onClickRemove(item) 
{
    if(confirm("Are you sure?")){
        item.remove();
        //remove from storage
        removeItemFromStorage(item.textContent);
        checkUI();
    }
 
}
function removeItemFromStorage(item) {
    let items = getItemFromStorage();
    items=items.filter((i) =>i !== item);
    localStorage.setItem("items",JSON.stringify(items));

}
function clearItem(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  //clear from storage
    localStorage.removeItem("items");
  checkUI();
}
function checkUI() {
  const Items = itemList.querySelectorAll("li");
  console.log(Items);
  if (Items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
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
