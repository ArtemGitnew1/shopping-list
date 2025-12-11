const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(` Сервер запущен на http://localhost:${PORT}`);
    console.log('='.repeat(50));
    console.log('\n Доступные эндпоинты:');
    console.log('GET    /api/shopping-list     - Получить все товары');
    console.log('GET    /api/shopping-list/:id - Получить товар по ID');
    console.log('POST   /api/shopping-list     - Создать новый товар');
    console.log('PUT    /api/shopping-list/:id - Обновить товар');
    console.log('DELETE /api/shopping-list/:id - Удалить товар');
    console.log('PATCH  /api/shopping-list/:id/toggle - Переключить статус');
    console.log('\n Веб-интерфейс: http://localhost:3000');
});