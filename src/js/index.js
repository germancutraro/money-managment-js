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
import { render, UI, resetValues,  items } from './utils';

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


