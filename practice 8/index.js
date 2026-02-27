// берем элементы по их айди в html файле
const elements = {
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    info: document.getElementById('info'),
    ip: document.getElementById('ip'),
    country: document.getElementById('country'),
    region: document.getElementById('region'),
    city: document.getElementById('city'),
    refreshBtn: document.getElementById('refreshBtn')
};

// Показывает сообщение об ошибке
function showError(message) {
    elements.error.textContent = message;
    elements.error.classList.remove('hidden');
    elements.info.classList.add('hidden');
    elements.loading.classList.add('hidden');
}

// Скрывает сообщение об ошибке
function hideError() {
    elements.error.classList.add('hidden');
}

// Показывает индикатор загрузки
function showLoading() {
    elements.loading.classList.remove('hidden');
    elements.info.classList.add('hidden');
    hideError();
    elements.refreshBtn.disabled = true;
}

// Скрывает индикатор загрузки
function hideLoading() {
    elements.loading.classList.add('hidden');
    elements.refreshBtn.disabled = false;
}

// Отображает полученные данные на странице ip - IP-адрес, geoData - Данные геолокации
function displayData(ip, geoData) {
    elements.ip.textContent = ip;
    elements.country.textContent = geoData.country || '—';
    elements.region.textContent = geoData.region || '—';
    elements.city.textContent = geoData.city || '—';
    
    elements.info.classList.remove('hidden');
}

// Получает IP-адрес пользователя
async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org/?format=json');
        
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }
        
        const data = await response.json();
        return data.ip;
    } catch (error) {
        throw new Error('Не удалось получить IP-адрес. Проверьте подключение к интернету.');
    }
}

// Получает геолокацию по IP-адресу
async function getGeolocation(ip) {
    try {
        // Используем бесплатный API ip-api.com (не требует токена)
        const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city`);
        
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'fail') {
            throw new Error('Не удалось определить геолокацию');
        }
        
        return {
            country: data.country,
            region: data.regionName,
            city: data.city
        };
    } catch (error) {
        throw new Error('Не удалось получить данные геолокации. Сервис временно недоступен.');
    }
}

// Основная функция для получения всех данных
async function getLocationData() {
    try {
        // Показываем загрузку
        showLoading();
        
        // Получаем IP-адрес
        const ip = await getIP();
        
        // Получаем геолокацию по IP
        const geoData = await getGeolocation(ip);
        
        // Отображаем данные
        displayData(ip, geoData);
        
    } catch (error) {
        // Показываем ошибку
        showError(error.message);
        console.error('Ошибка:', error);
    } finally {
        // Скрываем загрузку
        hideLoading();
    }
}

// Автоматически получаем данные при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    getLocationData();
});