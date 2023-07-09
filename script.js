const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function addItem(e) {
  const newItemText = itemInput.value;
  e.preventDefault();
  //validate
  if (newItemText === "") {
    alert("please enter a value");
    return;
  }
  //list item

  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItemText));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  // add lis to Dom

  itemList.appendChild(li);
  checkUI();
  itemInput.value = "";
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
    if(window.confirm("Are you sure?")){
    e.target.parentElement.parentElement.remove();}
    checkUI();
}
}
function clearItem(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
    
  }
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
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItem);

checkUI();
