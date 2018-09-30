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
      return {
        icon: "<i class='fas fa-home'></i>",
        color: "#1abc9c"
      };
    case 'Car':
      return {
        icon: "<i class='fas fa-car'></i>",
        color: "#3498db"
      };
    case 'Shopping':  
     return {
       icon: "<i class='fas fa-weight-hanging'></i>",
       color: "#9b59b6"
     };
    case 'Entertainment':  
      return {
        icon: "<i class='fas fa-tv'></i>",
        color: "#e74c3c"
      };
    case 'Clothes':  
      return {
        icon: "<i class='fas fa-tshirt'></i>",
        color: "#f1c40f"
      };
    case 'Telephony':  
      return {
        icon: "<i class='fas fa-phone'></i>",
        color: "#34495e"
      };
    case 'Other':
      return  {
        icon: "<i class='fas fa-box'></i>",
        color: "#95a5a6"
      };
    default:
      return  {
        icon: "<i class='fas fa-box'></i>",
        color: "#95a5a6"
      };
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
  return `<div class="item" style="background: ${setCategoryIcon(e.category).color}">
             <h2 class="item-price"> $${e.price} </h2> 
             <p class="item-title"> ${e.name}  </p>
             <span class="item-category">  ${setCategoryIcon(e.category).icon} </span>
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
  itemCategory.value = "Home";
};



export const UI = () => {
  // Total money color
  (totalMoney.textContent < 0) ? totalMoney.classList.add("alert") : totalMoney.classList.remove("alert");
  
}