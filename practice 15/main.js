// ==================== Задание 1. Класс «Человек» ====================
console.log('=== Задание 1. Человек ===');

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        console.log(`Привет, я ${this.name}, мне ${this.age} лет`);
    }
}

const person1 = new Person('Анна', 25);
const person2 = new Person('Максим', 30);

person1.introduce();
person2.introduce();

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задание 2. Класс «Прямоугольник» ====================
console.log('=== Задание 2. Прямоугольник ===');

class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    
    getArea() {
        return this.width * this.height;
    }
    
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}

const rectangle = new Rectangle(5, 3);
console.log(`Площадь: ${rectangle.getArea()}`);
console.log(`Периметр: ${rectangle.getPerimeter()}`);

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задание 3. Класс «Счётчик» ====================
console.log('=== Задание 3. Счётчик ===');

class Counter {
    constructor() {
        this.count = 0;
    }
    
    increment() {
        this.count++;
    }
    
    decrement() {
        this.count--;
    }
    
    getValue() {
        return this.count;
    }
}

const counter = new Counter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(`Результат: ${counter.getValue()}`);

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задание 4. Класс «Книга» ====================
console.log('=== Задание 4. Книга ===');

class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    
    getInfo() {
        return `${this.title} (${this.year}) — ${this.author}`;
    }
}

const book1 = new Book('Мастер и Маргарита', 'Михаил Булгаков', 1967);
const book2 = new Book('Преступление и наказание', 'Фёдор Достоевский', 1866);
const book3 = new Book('Война и мир', 'Лев Толстой', 1869);

console.log(book1.getInfo());
console.log(book2.getInfo());
console.log(book3.getInfo());

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задание 5. Класс «Таймер обратного отсчёта» ====================
console.log('=== Задание 5. Таймер обратного отсчёта ===');

class CountdownTimer {
    constructor(seconds) {
        this.seconds = seconds;
    }
    
    start() {
        const interval = setInterval(() => {
            if (this.seconds > 0) {
                console.log(`Осталось: ${this.seconds} сек`);
                this.seconds--;
            } else {
                console.log('Время вышло!');
                clearInterval(interval);
            }
        }, 1000);
    }
    
    reset(newSeconds) {
        this.seconds = newSeconds;
        console.log(`Таймер сброшен на ${newSeconds} секунд`);
    }
}

console.log('Запуск таймера на 5 секунд:');
const timer = new CountdownTimer(5);
// timer.start(); // Раскомментируйте для запуска (ждёт 5 секунд)

// Для демонстрации без ожидания покажу, как работает метод reset:
timer.reset(10);
console.log(`Текущее значение секунд: ${timer.seconds}`);

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задание 6. Класс «Корзина покупок» ====================
console.log('=== Задание 6. Корзина покупок ===');

class ShoppingCart {
    constructor() {
        this.items = [];
    }
    
    addItem(item) {
        this.items.push(item);
        console.log(`Добавлен товар: ${item}`);
    }
    
    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            console.log(`Удалён товар: ${item}`);
        } else {
            console.log(`Товар "${item}" не найден в корзине`);
        }
    }
    
    getTotalItems() {
        return this.items.length;
    }
    
    showItems() {
        if (this.items.length === 0) {
            console.log('Корзина пуста');
        } else {
            console.log('Товары в корзине:', this.items.join(', '));
        }
    }
}

const cart = new ShoppingCart();
cart.addItem('Яблоки');
cart.addItem('Молоко');
cart.addItem('Хлеб');
cart.removeItem('Молоко');
console.log(`Общее количество товаров: ${cart.getTotalItems()}`);
cart.showItems();

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задание 7. Класс «Пароль» ====================
console.log('=== Задание 7. Пароль ===');

class Password {
    constructor(value) {
        this.value = value;
    }
    
    isValid() {
        return this.value.length >= 8;
    }
    
    mask() {
        if (this.value.length <= 3) {
            return '*'.repeat(this.value.length);
        }
        const visible = this.value.slice(0, 3);
        const hidden = '*'.repeat(this.value.length - 3);
        return visible + hidden;
    }
}

const password1 = new Password('pass1234');
const password2 = new Password('123');

console.log(`Пароль: ${password1.value}`);
console.log(`Валидный: ${password1.isValid()}`);
console.log(`Маскированный: ${password1.mask()}`);

console.log(`\nПароль: ${password2.value}`);
console.log(`Валидный: ${password2.isValid()}`);
console.log(`Маскированный: ${password2.mask()}`);

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задание 8. Класс «Календарь» ====================
console.log('=== Задание 8. Календарь ===');

class SimpleCalendar {
    constructor(day, month, year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }
    
    getDateString() {
        const formattedDay = this.day < 10 ? `0${this.day}` : `${this.day}`;
        const formattedMonth = this.month < 10 ? `0${this.month}` : `${this.month}`;
        return `${formattedDay}.${formattedMonth}.${this.year}`;
    }
}

const date1 = new SimpleCalendar(5, 3, 2024);
const date2 = new SimpleCalendar(25, 12, 2023);
const date3 = new SimpleCalendar(1, 1, 2025);

console.log(date1.getDateString());
console.log(date2.getDateString());
console.log(date3.getDateString());

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задание 9. Класс «Калькулятор» ====================
console.log('=== Задание 9. Калькулятор ===');

class Calculator {
    calculate(a, b, operation) {
        switch (operation) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) {
                    return 'Ошибка: деление на ноль';
                }
                return a / b;
            default:
                return null;
        }
    }
}

const calc = new Calculator();

console.log(`10 + 5 = ${calc.calculate(10, 5, '+')}`);
console.log(`10 - 5 = ${calc.calculate(10, 5, '-')}`);
console.log(`10 * 5 = ${calc.calculate(10, 5, '*')}`);
console.log(`10 / 5 = ${calc.calculate(10, 5, '/')}`);
console.log(`10 % 5 = ${calc.calculate(10, 5, '%')} (неподдерживаемая операция)`);

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задание 10. Класс «Игрок» ====================
console.log('=== Задание 10. Игрок ===');

class Player {
    constructor(name, health = 100, level = 1) {
        this.name = name;
        this.health = health;
        this.level = level;
    }
    
    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) {
            this.health = 0;
        }
        console.log(`${this.name} получает ${amount} урона. Здоровье: ${this.health}`);
    }
    
    heal(amount) {
        this.health += amount;
        if (this.health > 100) {
            this.health = 100;
        }
        console.log(`${this.name} лечится на ${amount}. Здоровье: ${this.health}`);
    }
    
    levelUp() {
        this.level++;
        console.log(`${this.name} повышает уровень до ${this.level}`);
    }
    
    showStats() {
        console.log(`\n=== Статистика игрока ===`);
        console.log(`Имя: ${this.name}`);
        console.log(`Здоровье: ${this.health}`);
        console.log(`Уровень: ${this.level}`);
    }
}

const player = new Player('Артур', 85, 2);
player.showStats();

player.takeDamage(30);
player.takeDamage(20);
player.heal(25);
player.levelUp();
player.showStats();

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Дополнительные тесты для проверки граничных случаев ====================
console.log('=== Дополнительные тесты ===\n');

// Проверка максимального здоровья (не более 100)
const testPlayer = new Player('Тест', 95);
testPlayer.heal(20);
console.log(`После лечения (95+20): ${testPlayer.health} (должно быть 100)`);

// Проверка минимального здоровья (не менее 0)
testPlayer.takeDamage(150);
console.log(`После урона 150: ${testPlayer.health} (должно быть 0)`);

// Проверка валидации пароля
const weakPass = new Password('1234567');
const strongPass = new Password('12345678');
console.log(`\nПароль "1234567" валидный: ${weakPass.isValid()}`);
console.log(`Пароль "12345678" валидный: ${strongPass.isValid()}`);

// Проверка маскировки короткого пароля
const shortPass = new Password('abc');
console.log(`Маскировка "abc": ${shortPass.mask()}`);