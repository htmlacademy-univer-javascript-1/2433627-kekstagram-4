// Функция для проверки длины строки
const checkStringLength = function(string, value){
  const length = string.length;
  return length <= value;
};

console.log(checkStringLength('строка', 79)); // Значение больше длины строки (true)
console.log(checkStringLength('строка', 6)); // Значение равно длине строки (true)
console.log(checkStringLength('строка', 3)); // Значение меньше длины строки (false)

//Функция для проверки, является ли строка палиндромом
const isPalindrome = function(string){
  const changedString = string.replaceAll(' ', '').toLowerCase();
  let newString ='';
  for (let i = changedString.length - 1; i >= 0; i = i - 1) {
    newString += changedString[i];
  }
  return changedString === newString;
};

console.log(isPalindrome('топот')); //true
console.log(isPalindrome('ДовОд')); //true
console.log(isPalindrome('Кекс')); //false
console.log(isPalindrome('Лёша на полке клопа нашёл ')); //true

//Дополнительное задание
const highlightNumbers = function(object){
  const string = String(object);
  let numbers = '';
  for (let i = 0; i < string.length; i += 1){
    const symbol = parseInt(string[i], 10);
    if(!Number.isNaN(symbol)) {
      numbers += string[i];
    }
  }
  return parseInt(numbers, 10);
};

console.log('-----------------');
console.log(highlightNumbers('2023 год'));
console.log(highlightNumbers('ECMAScript 2022'));
console.log(highlightNumbers('агент 007'));
console.log(highlightNumbers(-1.67));
