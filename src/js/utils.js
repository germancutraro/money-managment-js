import { getData, saveData } from './storage'; 
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

export let items = (getData('items')) ? getData('items') : [];
export let incomesList = (getData('incomes')) ? getData('incomes') : [];
let template;

const setCategoryIcon = category => {
  switch (category) {
    case 'Home': 
      return "<i class='fas fa-home'></i>";
    case 'Car':
      return "<i class='fas fa-car'></i>";
    case 'Shopping':  
     return "<i class='fas fa-weight-hanging'></i>";
    case 'Entertainment':  
      return "<i class='fas fa-tv'></i>";
  }
};

export const totalPrices = () => {
  const itemsPrices = items.reduce((prev, current) => {
    return Number(prev) + Number(current.price);
  }, 0); 
  
  const incomesPrices = incomesList.reduce((prev, current) => {
    return Number(prev) + Number(current.income);
  }, 0);
    
  return incomesPrices - itemsPrices;
}


export const structure = e => {
  return `<div class="item">
             <h2 class="item-price"> $${e.price} </h2> 
             <p class="item-title"> ${e.name}  </p>
             <span class="item-category">  ${setCategoryIcon(e.category)} </span>
          </div>`;
};

export const render = () => {
  itemsContainer.innerHTML = "";
  template = "";
  items.forEach(e => {
    template += structure(e);
    itemsContainer.innerHTML = template;
  });
};

export const resetValues = () => {
  itemName.value = "";
  itemPrice.value = "";
  itemCategory.value = "Option 1";
};



export const UI = () => {
  // Total money color
  (totalMoney.textContent < 0) ? totalMoney.classList.add("alert") : totalMoney.classList.remove("alert");
  
}