function checkNegative(num) {
    if (num < 0) {
        console.log(${num} отрицательное число);
    } else {
        console.log(${num} не отрицательное число);
    }
}


function stringLength(str) {
    console.log(Длина строки "${str}": ${str.length});
}


function lastChar(str) {
    console.log(Последний символ строки "${str}": ${str[str.length - 1]});
}


function checkEven(num) {
    if (num % 2 === 0) {
        console.log(${num} четное число);
    } else {
        console.log(${num} нечетное число);
    }
}


function checkFirstLetters(word1, word2) {
    if (word1[0] === word2[0]) {
        console.log(Первые буквы "${word1}" и "${word2}" совпадают);
    } else {
        console.log(Первые буквы "${word1}" и "${word2}" не совпадают);
    }
}


function secondLastChar(str) {
    if (str.length > 1) {
        console.log(предпоследний символ строки "${str}": ${str[str.length - 2]});
    } else {
        console.log(строка "${str}" слишком короткая);
    }
}


function checkDivision(num1, num2) {
    if (num2 === 0) {
        console.log("На 0 делить нельзя!");
    } else if (num1 % num2 === 0) {
        console.log(${num1} делится на ${num2} без остатка);
    } else {
        console.log(${num1} не делится на ${num2} без остатка);
    }
}


console.log("1 до 100:");
for (let i = 1; i <= 100; i++) {
    console.log(i);
}


console.log("100 до 1:");
for (let i = 100; i >= 1; i--) {
    console.log(i);
}


const str = "abcde";
const lettersArray = str.split('');


