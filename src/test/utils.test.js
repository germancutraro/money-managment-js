import { setCategoryIcon } from '../js/utils';

test('Should output a object with the icon information', () => {
  let result = setCategoryIcon('Home');
  // assertion
  expect(result).toEqual({
    icon: "<i class='fas fa-home'></i>",
    color: "#1abc9c"
  });
});

