var x = prompt('Введите число:');
var y = prompt('Введите степень в которую следует возвести число:');
var result = power(x, y);

if (result == null) {
  console.log(result);
  alert('Функция обрабатывает только положительные значения степени!');
} else {
  console.log(x + ' в степени ' + y + ' = ' + result);
}

function power(x, powerOfx) {
  if (powerOfx == 0) {
    return 1;
  }
  if (powerOfx < 0) {
    return null;
  }
  return x * power(x , --powerOfx);
}