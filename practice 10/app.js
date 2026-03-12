const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Настройка шаблонизатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Хранилище для писем (в реальном проекте заменили бы на БД)
let letters = [];

// Главная страница - редирект на форму
app.get('/', (req, res) => {
    res.redirect('/letter');
});

// Страница с формой
app.get('/letter', (req, res) => {
    res.render('index', { 
        title: 'Напиши письмо Деду Морозу',
        error: null,
        formData: {}
    });
});

// Обработка отправки формы
app.post('/submit-letter', (req, res) => {
    const { name, age, wish } = req.body;
    
    // Валидация
    const errors = [];
    
    if (!name || name.trim().length < 2) {
        errors.push('Имя должно содержать минимум 2 символа');
    }
    
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 3 || ageNum > 12) {
        errors.push('Возраст должен быть от 3 до 12 лет');
    }
    
    if (!wish || wish.trim().length < 5) {
        errors.push('Желание должно содержать минимум 5 символов');
    } else if (wish.length > 200) {
        errors.push('Желание не должно превышать 200 символов');
    }
    
    // Если есть ошибки, показываем форму снова
    if (errors.length > 0) {
        return res.render('index', {
            title: 'Ошибка в форме',
            error: errors.join('. '),
            formData: { name, age, wish }
        });
    }
    
    // Сохраняем письмо
    const letter = {
        id: Date.now(),
        name: name.trim(),
        age: ageNum,
        wish: wish.trim(),
        date: new Date().toLocaleString('ru-RU')
    };
    
    letters.push(letter);
    
    // Перенаправляем на страницу с письмом
    res.redirect(`/result/${letter.id}`);
});

// Страница с готовым письмом
app.get('/result/:id', (req, res) => {
    const letter = letters.find(l => l.id == req.params.id);
    
    if (!letter) {
        return res.status(404).send('Письмо не найдено');
    }
    
    res.render('letter', {
        title: 'Твоё письмо Деду Морозу',
        letter: letter
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🎅 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📝 Форма письма: http://localhost:${PORT}/letter`);
});