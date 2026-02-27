
let book = {
  title: "Кровавый меридиан",
  author: "Кормак Маккарти",
  year: 1985,
};
console.log(`${book.title} by ${book.author} (${book.year})`);


let student = {
  name: "Даша",
  age: 18,
  grades: [5, 4, 3, 2],
  getAverageGrade: function() {
    let sum = this.grades.reduce((acc, grade) => acc + grade, 0);
    return sum / this.grades.length;
  }
};
console.log(`Средний балл студента ${student.name}: ${student.getAverageGrade()}`);


let calculator = {
  a: 0,
  b: 0,
  read: function(a, b) {
    this.a = a;
    this.b = b;
  },
  sum: function() {
    return this.a + this.b;
  },
  mult: function() {
    return this.a * this.b;
  }
};
calculator.read(5, 10);
console.log(`Сумма: ${calculator.sum()}`);
console.log(`Произведение: ${calculator.mult()}`);


let trafficLight = {
  currentColor: "red",
  next: function() {
    if (this.currentColor === "red") {
      this.currentColor = "green";
    } else if (this.currentColor === "green") {
      this.currentColor = "yellow";
    } else {
      this.currentColor = "red";
    }
    console.log(`Цвет светофора: ${this.currentColor}`);
  }
};
trafficLight.next(); 
trafficLight.next(); 
trafficLight.next(); 


let bankAccount = {
  owner: "Даша",
  balance: 1000,
  deposit: function(amount) {
    this.balance += amount;
    console.log(`Пополнено: ${amount}. Баланс: ${this.balance}`);
  },
  withdraw: function(amount) {
    if (amount > this.balance) {
      console.log("Ошибка: недостаточно средств");
    } else {
      this.balance -= amount;
      console.log(`Снято: ${amount}. Баланс: ${this.balance}`);
    }
  }
};
bankAccount.deposit(500);
bankAccount.withdraw(300);
bankAccount.withdraw(1500); 


let cat = {
  name: "bmw",
  isHungry: true,
  meow: function() {
    console.log(`Мяу! ${this.name}`);
  },
  feed: function() {
    if (this.isHungry) {
      this.isHungry = false;
      console.log(`${this.name} поел.`);
    } else {
      console.log(`${this.name} не хочет есть.`);
    }
  }
};
cat.meow();
cat.feed();
cat.feed(); 


let product = {
  name: "сыр",
  price: 50,
  quantity: 100
};
let cartItem = {
  product: product,
  quantity: 3,
  getTotalPrice: function() {
    return this.product.price * this.quantity;
  }
};
console.log(`Общая стоимость товара: ${cartItem.getTotalPrice()}`);


let userProfile = {
  username: "Dasha_52",
  email: "Dasha_52@gmail.com",
  isOnline: false,
  toggleStatus: function() {
    this.isOnline = !this.isOnline;
    console.log(`Пользователь ${this.username} теперь ${this.isOnline ? "online" : "offline"}`);
  }
};
userProfile.toggleStatus(); 
userProfile.toggleStatus(); 


let rectangle = {
  width: 10,
  height: 5,
  getArea: function() {
    return this.width * this.height;
  },
  getPerimeter: function() {
    return 2 * (this.width + this.height);
  },
  isSquare: function() {
    return this.width === this.height;
  }
};
console.log(`Площадь: ${rectangle.getArea()}`);
console.log(`Периметр: ${rectangle.getPerimeter()}`);
console.log(`Является ли квадратом: ${rectangle.isSquare()}`);


let library = {
  books: [],
  addBook: function(book) {
    this.books.push(book);
  },
  findBooksByAuthor: function(authorName) {
    return this.books.filter(b => b.author === authorName);
  },
  getAllTitles: function() {
    return this.books.map(b => b.title);
  }
};

library.addBook({title: "Война и мир", author: "Лев Толстой", year: 1869});
library.addBook({title: "Анна Каренина", author: "Лев Толстой", year: 1877});
library.addBook({title: "Отцы и дети", author: "Иван Тургенев", year: 1862});

console.log("Книги Толстого:", library.findBooksByAuthor("Лев Толстой"));
console.log("Все названия книг:", library.getAllTitles());