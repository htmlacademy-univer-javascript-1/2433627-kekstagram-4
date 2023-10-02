// Функция для проверки длины строки
const checkStringLength = function(string, value){
  const length = string.length;
  return length <= value;
};

//Функция для проверки, является ли строка палиндромом
const isPalindrome = function(string){
  const changedString = string.replaceAll(' ', '').toLowerCase();
  let newString ='';
  for (let i = changedString.length - 1; i >= 0; i = i - 1) {
    newString += changedString[i];
  }
  return changedString === newString;
};

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
