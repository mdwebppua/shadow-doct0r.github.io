var names = [];

for (var i = 0; i <= 4; i++) {
  names.push('' + prompt('Введите имя №: ' + (i + 1)));
};

var login = prompt('Введите имя пользователя: ');
var result = findName(names, login);

if (!result) {
  alert('Пользователь не найден!');
} else {
  alert(login + ', вы успешно вошли');
} 

function findName(names, name) {
  for (var i = names.length - 1; i >= 0; i--) {
    if (names[i] == name) {
      return name;
    } else {
      return null;
    }
  }
}