import {
  incomeForm,
  totalMoney,
  entryQuantity,
  itemForm,
  itemName,
  itemPrice,
  itemCategory
} from "./elements";


import { render, UI, resetValues, items, incomesList, totalPrices } from './utils';

// Import Local Storage functions
import { saveData } from './storage';

totalMoney.textContent = totalPrices();
UI();
// money entry
incomeForm.addEventListener("submit", e => {
  e.preventDefault();
  if (typeof Number(entryQuantity.value) === "number" && entryQuantity.value > 0) {
    
    UI();
    incomesList.push({income: entryQuantity.value});
    saveData('incomes', incomesList);
    totalMoney.textContent = totalPrices();

    entryQuantity.value = "";
  } else {
    alert("Enter a valid format!")
  }
});


(items) ? render() : null;

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
  saveData('items', items);

  }
});


