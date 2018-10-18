import { setCategoryIcon, totalPrices } from "../js/utils";

test("Should output a object with the icon information", () => {
  let result = setCategoryIcon("Home");
  // assertion
  expect(result).toEqual({
    icon: "<i class='fas fa-home'></i>",
    color: "#1abc9c"
  });
});

test("Should output 100", () => {
  let items = [
    { name: "T-Shirt", price: 100, category: "Shopping" },
    { name: "Nike React Epic", price: 1800, category: "Shopping" }
  ];

  let incomes = [{ income: 2000 }];

  let result = totalPrices(items, incomes);
  // assertion
  expect(result).toBe(100);
});
