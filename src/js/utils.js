const items = [];

let template;

export const structure = e => {
  return `<div class="item">
             <h2 class="item-price"> $${e.price} </h2> 
             <p class="item-title"> ${e.name}  </p>
             <span class="item-category">${e.category}</span>
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