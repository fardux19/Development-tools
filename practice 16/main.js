// ==================== Задача 1. Базовый класс ====================
console.log('=== Задача 1. Figure и Circle ===');

class Figure {
    getArea() {
        return 0;
    }
}

class Circle extends Figure {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    getArea() {
        return Math.PI * this.radius ** 2;
    }
}

const circle = new Circle(5);
console.log(`Площадь круга (радиус 5): ${circle.getArea().toFixed(2)}`);

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задача 2. Транспортные средства ====================
console.log('=== Задача 2. Transport, Car и Bike ===');

class Transport {
    constructor(brand, year) {
        this.brand = brand;
        this.year = year;
    }
    
    getInfo() {
        return `${this.brand}, ${this.year} год`;
    }
}

class Car extends Transport {
    constructor(brand, year, doorsCount) {
        super(brand, year);
        this.doorsCount = doorsCount;
    }
    
    getInfo() {
        return `Автомобиль: ${super.getInfo()}, дверей: ${this.doorsCount}`;
    }
}

class Bike extends Transport {
    constructor(brand, year, hasBasket) {
        super(brand, year);
        this.hasBasket = hasBasket;
    }
    
    getInfo() {
        return `Велосипед: ${super.getInfo()}, корзина: ${this.hasBasket ? 'есть' : 'нет'}`;
    }
}

const car = new Car('Toyota', 2022, 4);
const bike = new Bike('Giant', 2023, true);

console.log(car.getInfo());
console.log(bike.getInfo());

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задача 3. Работники ====================
console.log('=== Задача 3. Employee, Manager и Developer ===');

class Employee {
    constructor(name, baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }
    
    calculateSalary() {
        return this.baseSalary;
    }
}

class Manager extends Employee {
    constructor(name, baseSalary, bonus) {
        super(name, baseSalary);
        this.bonus = bonus;
    }
    
    calculateSalary() {
        return this.baseSalary + this.bonus;
    }
}

class Developer extends Employee {
    constructor(name, baseSalary, hoursWorked, hourlyRate) {
        super(name, baseSalary);
        this.hoursWorked = hoursWorked;
        this.hourlyRate = hourlyRate;
    }
    
    calculateSalary() {
        return this.baseSalary + (this.hoursWorked * this.hourlyRate);
    }
}

const manager = new Manager('Анна', 5000, 1500);
const developer = new Developer('Максим', 3000, 20, 50);

console.log(`Зарплата менеджера ${manager.name}: ${manager.calculateSalary()}$`);
console.log(`Зарплата разработчика ${developer.name}: ${developer.calculateSalary()}$`);

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задача 4. Животные ====================
console.log('=== Задача 4. Animal, Cat, Dog и Cow ===');

class Animal {
    constructor(name) {
        this.name = name;
    }
    
    sound() {
        return 'Some animal sound';
    }
    
    makeSound() {
        console.log(`${this.name} говорит: ${this.sound()}`);
    }
}

class Cat extends Animal {
    sound() {
        return 'Мяу-мяу!';
    }
}

class Dog extends Animal {
    sound() {
        return 'Гав-гав!';
    }
}

class Cow extends Animal {
    sound() {
        return 'Му-у-у!';
    }
}

const cat = new Cat('Барсик');
const dog = new Dog('Шарик');
const cow = new Cow('Бурёнка');

cat.makeSound();
dog.makeSound();
cow.makeSound();

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задача 5. Геометрические фигуры ====================
console.log('=== Задача 5. Rectangle и Square ===');

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

class Square extends Rectangle {
    constructor(side) {
        super(side, side);
        this.side = side;
    }
    
    getArea() {
        return this.side ** 2;
    }
}

const rectangle = new Rectangle(5, 3);
const square = new Square(4);

console.log(`Прямоугольник 5×3 - площадь: ${rectangle.getArea()}, периметр: ${rectangle.getPerimeter()}`);
console.log(`Квадрат 4×4 - площадь: ${square.getArea()}, периметр: ${square.getPerimeter()}`);

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задача 6. Библиотека ====================
console.log('=== Задача 6. Book, Fiction и NonFiction ===');

class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
    
    getInfo() {
        return `"${this.title}" - ${this.author}, ${this.pages} стр.`;
    }
}

class Fiction extends Book {
    constructor(title, author, pages, genre) {
        super(title, author, pages);
        this.genre = genre;
    }
    
    getInfo() {
        return `[Художественная] ${super.getInfo()}, жанр: ${this.genre}`;
    }
}

class NonFiction extends Book {
    constructor(title, author, pages, topic) {
        super(title, author, pages);
        this.topic = topic;
    }
    
    getInfo() {
        return `[Научная] ${super.getInfo()}, тема: ${this.topic}`;
    }
}

const fictionBook = new Fiction('Мастер и Маргарита', 'Булгаков', 480, 'роман');
const nonFictionBook = new NonFiction('Краткая история времени', 'Хокинг', 256, 'физика');

console.log(fictionBook.getInfo());
console.log(nonFictionBook.getInfo());

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задача 7. Магазин ====================
console.log('=== Задача 7. Product, DiscountedProduct и PremiumProduct ===');

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    
    getPrice() {
        return this.price;
    }
    
    getInfo() {
        return `${this.name}: ${this.getPrice()}₽`;
    }
}

class DiscountedProduct extends Product {
    constructor(name, price, discountPercent) {
        super(name, price);
        this.discountPercent = discountPercent;
    }
    
    getPrice() {
        const discountedPrice = this.price * (1 - this.discountPercent / 100);
        return Math.round(discountedPrice * 100) / 100;
    }
    
    getInfo() {
        return `${this.name}: ${this.price}₽ -> ${this.getPrice()}₽ (скидка ${this.discountPercent}%)`;
    }
}

class PremiumProduct extends Product {
    constructor(name, price, premiumMultiplier = 1.2) {
        super(name, price);
        this.premiumMultiplier = premiumMultiplier;
    }
    
    getPrice() {
        return this.price * this.premiumMultiplier;
    }
    
    getInfo() {
        return `${this.name} (премиум): ${this.getPrice()}₽ (обычная цена: ${this.price}₽)`;
    }
}

const regularProduct = new Product('Книга', 500);
const discountedProduct = new DiscountedProduct('Футболка', 1000, 25);
const premiumProduct = new PremiumProduct('Смартфон', 50000, 1.3);

console.log(regularProduct.getInfo());
console.log(discountedProduct.getInfo());
console.log(premiumProduct.getInfo());

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задача 8. Учебные заведения ====================
console.log('=== Задача 8. Person, Student и Teacher ===');

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        return `Меня зовут ${this.name}, мне ${this.age} лет`;
    }
}

class Student extends Person {
    constructor(name, age, studentId, grade) {
        super(name, age);
        this.studentId = studentId;
        this.grade = grade;
    }
    
    introduce() {
        return `${super.introduce()}. Я студент, ID: ${this.studentId}, класс: ${this.grade}`;
    }
    
    study() {
        console.log(`${this.name} усердно учится!`);
    }
}

class Teacher extends Person {
    constructor(name, age, subject, experience) {
        super(name, age);
        this.subject = subject;
        this.experience = experience;
    }
    
    introduce() {
        return `${super.introduce()}. Я учитель ${this.subject}, стаж ${this.experience} лет`;
    }
    
    teach() {
        console.log(`${this.name} ведёт урок по ${this.subject}`);
    }
}

const student = new Student('Олег', 16, 'S12345', '10A');
const teacher = new Teacher('Мария Ивановна', 35, 'математика', 12);

console.log(student.introduce());
student.study();
console.log(teacher.introduce());
teacher.teach();

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задача 9. Многоуровневое наследование ====================
console.log('=== Задача 9. Animal -> Mammal -> Dog ===');

class Animal {
    constructor(name) {
        this.name = name;
    }
    
    eat() {
        return `${this.name} кушает`;
    }
}

class Mammal extends Animal {
    constructor(name, furColor) {
        super(name);
        this.furColor = furColor;
    }
    
    breathe() {
        return `${this.name} дышит лёгкими`;
    }
    
    giveBirth() {
        return `${this.name} рождает живых детёнышей`;
    }
}

class Dog extends Mammal {
    constructor(name, furColor, breed) {
        super(name, furColor);
        this.breed = breed;
    }
    
    bark() {
        return `${this.name} гавкает! Гав-гав!`;
    }
    
    // Переопределяем метод eat
    eat() {
        return `${this.name} ест собачий корм`;
    }
}

const dog1 = new Dog('Рекс', 'коричневый', 'овчарка');

console.log(dog1.eat());           // Переопределённый метод
console.log(dog1.breathe());       // От Mammal
console.log(dog1.giveBirth());     // От Mammal
console.log(dog1.bark());          // Свой метод Dog
console.log(`${dog1.name} - ${dog1.breed}, окрас: ${dog1.furColor}`);

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Задача 10. Абстрактный класс ====================
console.log('=== Задача 10. Shape, Triangle и Rectangle ===');

// Абстрактный класс (имитация через обычный класс с выбрасыванием ошибки)
class Shape {
    constructor() {
        if (this.constructor === Shape) {
            throw new Error('Нельзя создать экземпляр абстрактного класса Shape');
        }
    }
    
    getArea() {
        throw new Error('Метод getArea() должен быть реализован в наследнике');
    }
}

class Triangle extends Shape {
    constructor(base, height) {
        super();
        this.base = base;
        this.height = height;
    }
    
    getArea() {
        return (this.base * this.height) / 2;
    }
}

class RectangleShape extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    
    getArea() {
        return this.width * this.height;
    }
}

try {
    // const shape = new Shape(); // Ошибка!
    const triangle = new Triangle(10, 5);
    const rectangleShape = new RectangleShape(8, 4);
    
    console.log(`Площадь треугольника (осн.10, выс.5): ${triangle.getArea()}`);
    console.log(`Площадь прямоугольника (8×4): ${rectangleShape.getArea()}`);
} catch (error) {
    console.log(error.message);
}

console.log('\n' + '='.repeat(50) + '\n');

// ==================== Дополнительные тесты ====================
console.log('=== Дополнительные тесты для проверки ===\n');

// Тест 1: Множественное наследование не используется, но цепочка работает
console.log('Цепочка наследования Dog:');
console.log(dog1 instanceof Dog);      // true
console.log(dog1 instanceof Mammal);   // true
console.log(dog1 instanceof Animal);   // true

// Тест 2: Проверка переопределённых методов
console.log('\nПроверка переопределения методов:');
console.log(`Animal.eat(): ${new Animal('Animal').eat()}`);
console.log(`Dog.eat(): ${dog1.eat()}`);

// Тест 3: super() во всех конструкторах работает корректно
console.log('\nВсе классы корректно используют super() и наследование!');