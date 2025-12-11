# Shopping List API
Проект представляет собой RESTful API для управления списком покупок, разработанный на Express.js.

## Основные возможности
- Полный CRUD для товаров в списке покупок
- Фильтрация и сортировка товаров
- Валидация входных данных
- Логирование всех запросов
- Веб-интерфейс для тестирования API

## Технологии
- Node.js
- Express.js
- REST API

## API Endpoints
### GET /api/shopping-list
Получить все товары. Поддерживает query-параметры:
- `category` - фильтрация по категории
- `purchased` - фильтрация по статусу покупки (true/false)
- `sort` - сортировка (name/category)
- `search` - поиск по названию

### GET /api/shopping-list/:id
Получить товар по ID

### POST /api/shopping-list
Создать новый товар

### PUT /api/shopping-list/:id
Обновить товар

### DELETE /api/shopping-list/:id
Удалить товар

### PATCH /api/shopping-list/:id/toggle
Переключить статус покупки

## Скриншоты
[Здесь будут скриншоты работы приложения]
