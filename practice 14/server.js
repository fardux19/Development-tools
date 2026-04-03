const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// 1. Эхо-сервер
app.get('/echo', (req, res) => {
    const { text } = req.query;
    if (!text) {
        return res.status(400).json({ error: 'Parameter "text" is required' });
    }
    res.json({ text: text });
});

// 2. Длина строки
app.get('/length', (req, res) => {
    const { text } = req.query;
    if (!text) {
        return res.status(400).json({ error: 'Parameter "text" is required' });
    }
    res.json({ length: text.length });
});

// 3. Реверс строки
app.get('/reverse', (req, res) => {
    const { text } = req.query;
    if (!text) {
        return res.status(400).json({ error: 'Parameter "text" is required' });
    }
    const reversed = text.split('').reverse().join('');
    res.json({ reversed: reversed });
});

// 4. Верхний и нижний регистр
app.get('/case', (req, res) => {
    const { text, type } = req.query;
    if (!text || !type) {
        return res.status(400).json({ error: 'Parameters "text" and "type" are required' });
    }
    
    let result;
    if (type === 'upper') {
        result = text.toUpperCase();
    } else if (type === 'lower') {
        result = text.toLowerCase();
    } else {
        return res.status(400).json({ error: 'Type must be "upper" or "lower"' });
    }
    
    res.json({ result: result });
});

// 5. Подсчёт символов
app.get('/count-chars', (req, res) => {
    const { text, char } = req.query;
    if (!text || !char) {
        return res.status(400).json({ error: 'Parameters "text" and "char" are required' });
    }
    
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === char) {
            count++;
        }
    }
    
    res.json({ count: count });
});

// 6. Удаление пробелов
app.post('/trim', (req, res) => {
    const { text } = req.body;
    if (text === undefined) {
        return res.status(400).json({ error: 'Field "text" is required' });
    }
    
    const trimmed = text.trim();
    res.json({ trimmed: trimmed });
});

// 7. Замена подстроки
app.put('/replace', (req, res) => {
    const { text, search, replace } = req.body;
    if (!text || !search || replace === undefined) {
        return res.status(400).json({ error: 'Fields "text", "search", and "replace" are required' });
    }
    
    const result = text.split(search).join(replace);
    res.json({ result: result });
});

// 8. Проверка палиндрома
app.get('/palindrome', (req, res) => {
    const { text } = req.query;
    if (!text) {
        return res.status(400).json({ error: 'Parameter "text" is required' });
    }
    
    // Убираем пробелы и приводим к нижнему регистру
    const cleanText = text.toLowerCase().replace(/\s/g, '');
    const reversed = cleanText.split('').reverse().join('');
    const isPalindrome = cleanText === reversed;
    
    res.json({ isPalindrome: isPalindrome });
});

// 9. Разбиение на слова
app.get('/words', (req, res) => {
    const { text } = req.query;
    if (!text) {
        return res.status(400).json({ error: 'Parameter "text" is required' });
    }
    
    const words = text.split(/\s+/).filter(word => word.length > 0);
    res.json({ words: words });
});

// 10. Склейка строк
app.post('/concat', (req, res) => {
    const { strings, separator = ' ' } = req.body;
    if (!strings || !Array.isArray(strings)) {
        return res.status(400).json({ error: 'Field "strings" must be an array' });
    }
    
    const result = strings.join(separator);
    res.json({ result: result });
});

// 11. Шифр Цезаря
app.get('/caesar', (req, res) => {
    const { text, shift, action } = req.query;
    if (!text || !shift || !action) {
        return res.status(400).json({ error: 'Parameters "text", "shift", and "action" are required' });
    }
    
    let shiftNum = parseInt(shift);
    if (action === 'decode') {
        shiftNum = -shiftNum;
    }
    
    const result = text.split('').map(char => {
        const code = char.charCodeAt(0);
        
        // Латинские буквы A-Z
        if (code >= 65 && code <= 90) {
            let shifted = ((code - 65 + shiftNum) % 26 + 26) % 26;
            return String.fromCharCode(65 + shifted);
        }
        // Латинские буквы a-z
        else if (code >= 97 && code <= 122) {
            let shifted = ((code - 97 + shiftNum) % 26 + 26) % 26;
            return String.fromCharCode(97 + shifted);
        }
        // Остальные символы не меняем
        return char;
    }).join('');
    
    res.json({ result: result });
});

// 12. Статистика символов
app.get('/char-stats', (req, res) => {
    const { text } = req.query;
    if (!text) {
        return res.status(400).json({ error: 'Parameter "text" is required' });
    }
    
    const stats = {};
    const lowerText = text.toLowerCase();
    
    for (let char of lowerText) {
        stats[char] = (stats[char] || 0) + 1;
    }
    
    res.json({ stats: stats });
});

// 13. Валидация email
app.get('/validate-email', (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: 'Parameter "email" is required' });
    }
    
    // Регулярное выражение для валидации email
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    res.json({ isValid: isValid });
});

// 14. Генератор случайных строк
app.get('/random-string', (req, res) => {
    const { length, charset } = req.query;
    const len = parseInt(length);
    
    if (!length || isNaN(len) || len <= 0) {
        return res.status(400).json({ error: 'Valid parameter "length" is required' });
    }
    
    const defaultCharset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const chars = charset || defaultCharset;
    
    let result = '';
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    
    res.json({ randomString: result });
});

// 15. Поиск и замена с регулярными выражениями
app.put('/regex-replace', (req, res) => {
    const { text, pattern, replacement } = req.body;
    if (!text || !pattern || replacement === undefined) {
        return res.status(400).json({ error: 'Fields "text", "pattern", and "replacement" are required' });
    }
    
    try {
        const regex = new RegExp(pattern, 'g');
        const result = text.replace(regex, replacement);
        res.json({ result: result });
    } catch (error) {
        res.status(400).json({ error: 'Invalid regular expression pattern' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});