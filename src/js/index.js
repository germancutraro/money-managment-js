import {
  incomeForm,
  totalMoney,
  entryQuantity,
  itemForm,
  itemName,
  itemPrice,
  itemCategory,
  itemsContainer
} from "./elements";

// money entry
incomeForm.addEventListener("submit", e => {
  e.preventDefault();
  if (typeof Number(entryQuantity.value) === "number" && entryQuantity.value > 0) {
    totalMoney.textContent =
      Number(totalMoney.textContent) + Number(entryQuantity.value);
    entryQuantity.value = "";
    UI();
  } else {
    alert("Enter a valid format!")
  }
});

const items = [];

let template;

const structure = e => {
  return `<div class="item">
             <h2 class="item-price"> $${e.price} </h2> 
             <p class="item-title"> ${e.name}  </p>
             <span class="item-category">${e.category}</span>
          </div>`;
};

const render = () => {
  itemsContainer.innerHTML = "";
  template = "";
  items.forEach(e => {
    template += structure(e);
    itemsContainer.innerHTML = template;
  });
};

const resetValues = () => {
  itemName.value = "";
  itemPrice.value = "";
  itemCategory.value = "Option 1";
};

itemForm.addEventListener("submit", e => {
  e.preventDefault();
  if (itemName.value.trim() && itemPrice.value.trim()) {
    items.push({
      name: itemName.value,
      price: itemPrice.value,
      category: itemCategory.value
    });
    totalMoney.textContent = totalMoney.textContent - itemPrice.value;
    render();
    resetValues();
    UI();
  }
});

const UI = () => {
  // Total money color
  (totalMoney.textContent < 0) ? totalMoney.classList.add("alert") : totalMoney.classList.remove("alert");
}
