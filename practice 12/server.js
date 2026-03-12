const express = require('express');
const app = express();
const PORT = 3000;

// Middleware для парсинга JSON и urlencoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============= ЗАДАНИЕ 1: Базовый сервер =============
// GET / -> "Hello, Express!"
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// ============= ЗАДАНИЕ 2: Маршрут с параметром пути =============
// GET /user/:id -> { "id": "значение" }
app.get('/user/:id', (req, res) => {
    res.json({ id: req.params.id });
});

// ============= ЗАДАНИЕ 3: Маршрут с несколькими параметрами =============
// GET /book/:author/:title -> { "author": "...", "title": "..." }
app.get('/book/:author/:title', (req, res) => {
    res.json({
        author: req.params.author,
        title: req.params.title
    });
});

// ============= ЗАДАНИЕ 4: Обработка query-параметров =============
// GET /search?q=...&limit=... -> { "query": "...", "limit": "..." }
app.get('/search', (req, res) => {
    res.json({
        query: req.query.q || '',
        limit: req.query.limit || ''
    });
});

// ============= ЗАДАНИЕ 5: Простой POST-маршрут (JSON) =============
// POST /echo -> возвращает то же тело, что прислали
app.post('/echo', (req, res) => {
    res.json(req.body);
});

// ============= ЗАДАНИЕ 6: POST с формой (urlencoded) =============
// POST /form -> принимает данные формы и возвращает JSON
app.post('/form', (req, res) => {
    res.json({
        name: req.body.name || '',
        age: req.body.age || ''
    });
});

// ============= ЗАДАНИЕ 7: Комбинированный маршрут (GET + POST) =============
// GET /data -> { "method": "GET" }
// POST /data -> { "method": "POST", "body": ... }
app.route('/data')
    .get((req, res) => {
        res.json({ method: 'GET' });
    })
    .post((req, res) => {
        res.json({
            method: 'POST',
            body: req.body
        });
    });

// ============= ЗАДАНИЕ 8: Маршрут с условной логикой (чёт/нечёт) =============
// GET /check/:number -> { "result": "even" } или { "result": "odd" }
app.get('/check/:number', (req, res) => {
    const num = parseInt(req.params.number);
    
    if (isNaN(num)) {
        return res.status(400).json({ error: 'Параметр должен быть числом' });
    }
    
    res.json({
        result: num % 2 === 0 ? 'even' : 'odd'
    });
});

// ============= ЗАДАНИЕ 9: Обработка нескольких типов данных =============
// POST /analyze -> анализирует text и numbers
app.post('/analyze', (req, res) => {
    const { text, numbers } = req.body;
    
    // Валидация
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Поле text должно быть строкой' });
    }
    
    if (!Array.isArray(numbers) || numbers.some(n => typeof n !== 'number')) {
        return res.status(400).json({ error: 'Поле numbers должно быть массивом чисел' });
    }
    
    // Вычисления
    const length = text.length;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const average = numbers.length > 0 ? sum / numbers.length : 0;
    
    res.json({
        length,
        sum,
        average
    });
});

// ============= ЗАДАНИЕ 10: Динамический маршрут с валидацией =============
// GET /calc/:operation/:a/:b -> выполняет арифметическую операцию
app.get('/calc/:operation/:a/:b', (req, res) => {
    const { operation, a, b } = req.params;
    
    // Преобразуем в числа
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    
    // Проверка на числа
    if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).json({ error: 'Параметры должны быть числами' });
    }
    
    let result;
    
    // Выбор операции
    switch (operation) {
        case 'add':
            result = numA + numB;
            break;
        case 'sub':
            result = numA - numB;
            break;
        case 'mul':
            result = numA * numB;
            break;
        case 'div':
            if (numB === 0) {
                return res.status(400).json({ error: 'Деление на ноль' });
            }
            result = numA / numB;
            break;
        default:
            return res.status(400).json({ error: 'Unknown operation' });
    }
    
    res.json({ result });
});

// ============= Обработка 404 (необязательно, но полезно) =============
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// ============= Запуск сервера =============
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log('\n📌 Доступные маршруты:');
    console.log('  GET  /');
    console.log('  GET  /user/:id');
    console.log('  GET  /book/:author/:title');
    console.log('  GET  /search?q=&limit=');
    console.log('  POST /echo (JSON)');
    console.log('  POST /form (urlencoded)');
    console.log('  GET  /data');
    console.log('  POST /data');
    console.log('  GET  /check/:number');
    console.log('  POST /analyze (JSON)');
    console.log('  GET  /calc/:operation/:a/:b');
    console.log('\n💡 Примеры:');
    console.log('  http://localhost:3000/');
    console.log('  http://localhost:3000/user/123');
    console.log('  http://localhost:3000/book/Толстой/ВойнаИМир');
    console.log('  http://localhost:3000/search?q=nodejs&limit=10');
    console.log('  http://localhost:3000/check/7');
    console.log('  http://localhost:3000/calc/add/5/3');
});