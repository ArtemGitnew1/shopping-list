const express = require('express');
const logger = require('./middleware/logger');
const shoppingListRoutes = require('./routes/shoppingList');

const app = express();


app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.use(logger);


app.use(express.static('src/public'));


app.use('/api/shopping-list', shoppingListRoutes);


app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Shopping List API</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        h1 { color: #333; }
        .endpoint { background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 5px; }
      </style>
    </head>
    <body>
      <h1>🛒 Shopping List API</h1>
      <p>Express.js API для управления списком покупок</p>
      
      <h2>📋 Доступные эндпоинты:</h2>
      <div class="endpoint">
        <strong>GET</strong> <code>/api/shopping-list</code> - получить все товары
      </div>
      <div class="endpoint">
        <strong>GET</strong> <code>/api/shopping-list/:id</code> - получить товар по ID
      </div>
      <div class="endpoint">
        <strong>POST</strong> <code>/api/shopping-list</code> - создать новый товар
      </div>
      <div class="endpoint">
        <strong>PUT</strong> <code>/api/shopping-list/:id</code> - обновить товар
      </div>
      <div class="endpoint">
        <strong>DELETE</strong> <code>/api/shopping-list/:id</code> - удалить товар
      </div>
      <div class="endpoint">
        <strong>PATCH</strong> <code>/api/shopping-list/:id/toggle</code> - переключить статус
      </div>
      
      <h2>🔧 Тестирование:</h2>
      <p>Откройте консоль разработчика и используйте:</p>
      <pre><code>fetch('/api/shopping-list')
  .then(res => res.json())
  .then(data => console.log(data))</code></pre>
    </body>
    </html>
  `);
});


app.use((req, res) => {
    res.status(404).json({
        error: 'Маршрут не найден',
        availableEndpoints: [
            'GET    /api/shopping-list',
            'GET    /api/shopping-list/:id',
            'POST   /api/shopping-list',
            'PUT    /api/shopping-list/:id',
            'DELETE /api/shopping-list/:id',
            'PATCH  /api/shopping-list/:id/toggle'
        ]
    });
});

module.exports = app;