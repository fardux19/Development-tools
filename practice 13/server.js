const express = require('express');
const fs = require('fs').promises; // Используем промисы для асинхронной работы
const fsSync = require('fs'); // Для синхронных операций
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware для парсинга JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============= ЗАДАНИЕ 1: Базовая обработка ошибки =============
// GET /error -> генерирует ошибку и обрабатывает её
app.get('/error', (req, res) => {
    try {
        throw new Error('Тестовое исключение');
    } catch (err) {
        console.error('Задание 1 - Ошибка:', err.message);
        res.status(500).send('Internal Server Error');
    }
});

// ============= ЗАДАНИЕ 2: Обработка неверного JSON =============
// POST /parse-json -> принимает JSON и парсит его
app.post('/parse-json', (req, res) => {
    try {
        // Получаем сырые данные из запроса
        let rawData = '';
        req.on('data', chunk => rawData += chunk);
        
        req.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                res.json({ success: true, data: parsedData });
            } catch (parseErr) {
                res.status(400).json({ 
                    error: 'Неверный формат JSON',
                    message: parseErr.message 
                });
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

// ============= ЗАДАНИЕ 3: Проверка входных данных =============
// GET /user?name=... -> проверяет наличие имени
app.get('/user', (req, res) => {
    try {
        const { name } = req.query;
        
        if (!name) {
            throw new Error('Имя обязательно');
        }
        
        if (name.trim().length < 2) {
            throw new Error('Имя должно содержать минимум 2 символа');
        }
        
        res.json({ 
            success: true, 
            message: `Привет, ${name}!` 
        });
        
    } catch (err) {
        console.error('Задание 3 - Ошибка валидации:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// ============= ЗАДАНИЕ 4: Асинхронная операция с try-catch =============
// GET /fetch -> запрос к стороннему API
app.get('/fetch', async (req, res) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        if (!response.ok) {
            throw new Error(`API вернул статус ${response.status}`);
        }
        
        const data = await response.json();
        res.json({ 
            success: true, 
            data: data 
        });
        
    } catch (err) {
        console.error('Задание 4 - Ошибка при запросе к API:', err.message);
        res.status(503).json({ 
            error: 'Service Unavailable',
            message: 'Не удалось получить данные от внешнего сервиса'
        });
    }
});

// ============= ЗАДАНИЕ 5: Централизованный обработчик ошибок =============
// Сначала создадим маршрут, который генерирует ошибку для тестирования
app.get('/trigger-error', (req, res, next) => {
    try {
        // Генерируем ошибку
        throw new Error('Тестовая ошибка для централизованного обработчика');
    } catch (err) {
        next(err); // Передаем ошибку в middleware
    }
});

// Централизованный обработчик ошибок (должен быть после всех маршрутов)
// app.use((err, req, res, next) => {
//     console.error('🔥 Централизованный обработчик:', err.stack);
//     res.status(500).send('Что-то пошло не так!');
// });

// ============= ЗАДАНИЕ 6: Логирование ошибок в файл =============
// Вспомогательная функция для логирования
async function logErrorToFile(err, routeName) {
    const logMessage = `[${new Date().toISOString()}] ${routeName}: ${err.message}\n`;
    
    try {
        await fs.appendFile('errors.log', logMessage);
    } catch (logErr) {
        console.error('Не удалось записать ошибку в лог:', logErr.message);
    }
}

// Маршрут с логированием в файл
app.get('/log-error', async (req, res) => {
    try {
        throw new Error('Ошибка для логирования');
    } catch (err) {
        await logErrorToFile(err, '/log-error');
        console.error('Ошибка записана в файл errors.log');
        res.status(500).json({ error: 'Ошибка залогирована' });
    }
});

// ============= ЗАДАНИЕ 7: Обработка нескольких типов ошибок =============
// GET /divide?a=10&b=2 -> деление с обработкой разных ошибок
app.get('/divide', (req, res) => {
    try {
        const { a, b } = req.query;
        
        // Проверка наличия параметров
        if (a === undefined || b === undefined) {
            throw new Error('Missing parameters');
        }
        
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        
        // Проверка на числа
        if (isNaN(numA) || isNaN(numB)) {
            throw new Error('Invalid numbers');
        }
        
        // Проверка деления на ноль
        if (numB === 0) {
            throw new Error('Division by zero');
        }
        
        const result = numA / numB;
        res.json({ 
            success: true, 
            result: result 
        });
        
    } catch (err) {
        console.error('Задание 7 - Ошибка:', err.message);
        
        // Разные статусы для разных типов ошибок
        switch (err.message) {
            case 'Missing parameters':
                res.status(400).json({ 
                    error: 'Bad Request',
                    message: 'Не указаны параметры a и b' 
                });
                break;
                
            case 'Invalid numbers':
                res.status(400).json({ 
                    error: 'Bad Request',
                    message: 'Параметры должны быть числами' 
                });
                break;
                
            case 'Division by zero':
                res.status(422).json({ 
                    error: 'Unprocessable Entity',
                    message: 'Деление на ноль невозможно' 
                });
                break;
                
            default:
                res.status(500).json({ 
                    error: 'Internal Server Error',
                    message: 'Неизвестная ошибка' 
                });
        }
    }
});

// ============= ЗАДАНИЕ 8: Проброс ошибки в следующий обработчик =============
// GET /data -> пробрасывает ошибку в централизованный обработчик
app.get('/data', (req, res, next) => {
    try {
        // Имитация ошибки
        const data = null;
        if (!data) {
            throw new Error('Данные не найдены');
        }
        res.json({ data });
    } catch (err) {
        next(err); // Пробрасываем в централизованный обработчик
    }
});

// ============= ЗАДАНИЕ 9: Работа с файловой системой =============
// GET /read-file -> читает файл data.txt
app.get('/read-file', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'data.txt');
        const data = fsSync.readFileSync(filePath, 'utf8');
        
        res.json({ 
            success: true, 
            content: data 
        });
        
    } catch (err) {
        console.error('Задание 9 - Ошибка чтения файла:', err.message);
        
        // Обработка ошибки ENOENT (файл не найден)
        if (err.code === 'ENOENT') {
            res.status(404).json({ 
                error: 'Not Found',
                message: 'Файл data.txt не найден' 
            });
        } else {
            res.status(500).json({ 
                error: 'Internal Server Error',
                message: 'Ошибка при чтении файла' 
            });
        }
    }
});

// ============= ЗАДАНИЕ 10: Комбинированная обработка =============
// POST /process -> обрабатывает JSON, проверяет email и сохраняет в файл
app.post('/process', async (req, res) => {
    try {
        // 1. Парсинг JSON (уже автоматически парсится express.json())
        const data = req.body;
        
        // 2. Проверка наличия email
        if (!data.email) {
            throw new Error('Поле email обязательно');
        }
        
        // Валидация формата email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            throw new Error('Неверный формат email');
        }
        
        // 3. Сохранение данных в файл
        const filePath = path.join(__dirname, 'users.json');
        
        // Читаем существующие данные
        let users = [];
        try {
            const existingData = await fs.readFile(filePath, 'utf8');
            users = JSON.parse(existingData);
        } catch (readErr) {
            // Файла нет - создадим новый массив
            users = [];
        }
        
        // Добавляем нового пользователя
        const newUser = {
            id: Date.now(),
            ...data,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        
        // Сохраняем
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
        
        res.json({ 
            success: true, 
            message: 'Данные успешно сохранены',
            user: newUser
        });
        
    } catch (err) {
        // Логируем ошибку в консоль
        console.error('❌ Задание 10 - Ошибка обработки:', err.message);
        
        // Логируем в файл
        await logErrorToFile(err, '/process');
        
        // Отправляем ответ с соответствующим статусом
        if (err.message.includes('email')) {
            res.status(422).json({ 
                error: 'Unprocessable Entity',
                message: err.message
            });
        } else {
            res.status(500).json({ 
                error: 'Internal Server Error',
                message: 'Произошла внутренняя ошибка сервера'
            });
        }
    }
});

// ============= Централизованный обработчик ошибок (финальный) =============
// Этот middleware должен быть ПОСЛЕ всех маршрутов
app.use((err, req, res, next) => {
    // Логируем ошибку
    console.error('🔥 Централизованный обработчик ошибок:');
    console.error(err.stack);
    
    // Логируем в файл
    logErrorToFile(err, `CENTRAL_HANDLER - ${req.method} ${req.url}`);
    
    // Отправляем ответ
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: 'Что-то пошло не так!',
        ...(process.env.NODE_ENV === 'development' && { 
            details: err.message,
            stack: err.stack 
        })
    });
});

// ============= Обработка 404 (не найденные маршруты) =============
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not Found',
        message: `Маршрут ${req.method} ${req.url} не найден` 
    });
});

// ============= Запуск сервера =============
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log('\n📌 Доступные маршруты для тестирования:');
    console.log('  GET  /error');
    console.log('  POST /parse-json');
    console.log('  GET  /user?name=Анна');
    console.log('  GET  /fetch');
    console.log('  GET  /trigger-error');
    console.log('  GET  /log-error');
    console.log('  GET  /divide?a=10&b=2');
    console.log('  GET  /divide?a=10&b=0');
    console.log('  GET  /data');
    console.log('  GET  /read-file');
    console.log('  POST /process');
    
    console.log('\n💡 Команды для тестирования:');
    console.log('  # Тест 2: Неверный JSON');
    console.log('  curl -X POST http://localhost:3000/parse-json -H "Content-Type: application/json" -d "не json"');
    
    console.log('\n  # Тест 3: Валидация имени');
    console.log('  curl http://localhost:3000/user?name=');
    
    console.log('\n  # Тест 7: Деление на ноль');
    console.log('  curl "http://localhost:3000/divide?a=10&b=0"');
    
    console.log('\n  # Тест 9: Чтение файла (создайте data.txt)');
    console.log('  echo "Hello World" > data.txt');
    console.log('  curl http://localhost:3000/read-file');
    
    console.log('\n  # Тест 10: Обработка данных');
    console.log('  curl -X POST http://localhost:3000/process \\');
    console.log('    -H "Content-Type: application/json" \\');
    console.log('    -d \'{"email": "test@example.com", "name": "Анна"}\'');
});

// ============= Создаем тестовый файл для задания 9 =============
// Это создаст файл data.txt если его нет
try {
    const testFilePath = path.join(__dirname, 'data.txt');
    if (!fsSync.existsSync(testFilePath)) {
        fsSync.writeFileSync(testFilePath, 'Это тестовый файл для задания 9\nHello from data.txt');
        console.log('📄 Создан тестовый файл data.txt');
    }
} catch (err) {
    console.log('Не удалось создать тестовый файл');
}