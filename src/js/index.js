import { 
  incomeForm, totalMoney, entryQuantity,
  itemForm, itemName, itemPrice, itemCategory
} from './elements';

// money entry
incomeForm.addEventListener('submit', e => {
  e.preventDefault();

  totalMoney.textContent = Number(totalMoney.textContent) + Number(entryQuantity.value);
  entryQuantity.value = '';
});
