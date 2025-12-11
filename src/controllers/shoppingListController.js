
let shoppingList = [
    {
        id: 1,
        name: 'Молоко',
        quantity: 2,
        category: 'Молочные продукты',
        purchased: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        name: 'Хлеб',
        quantity: 1,
        category: 'Хлебобулочные изделия',
        purchased: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 3,
        name: 'Яблоки',
        quantity: 5,
        category: 'Фрукты',
        purchased: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 4,
        name: 'Кофе',
        quantity: 1,
        category: 'Напитки',
        purchased: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

let nextId = 5;



const getAllItems = (req, res) => {
    const { category, purchased, sort, search } = req.query;

    let filteredItems = [...shoppingList];


    if (search && search.trim() !== '') {
        const searchTerm = search.toLowerCase().trim();
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(searchTerm)
        );
    }


    if (category && category !== 'Все категории') {
        filteredItems = filteredItems.filter(item =>
            item.category.toLowerCase() === category.toLowerCase()
        );
    }


    if (purchased !== undefined) {
        const isPurchased = purchased === 'true';
        filteredItems = filteredItems.filter(item => item.purchased === isPurchased);
    }


    if (sort === 'name') {
        filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'category') {
        filteredItems.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sort === 'created') {
        filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json({
        success: true,
        count: filteredItems.length,
        data: filteredItems
    });
};

const getItemById = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            error: 'ID должен быть числом'
        });
    }

    const item = shoppingList.find(item => item.id === id);

    if (!item) {
        return res.status(404).json({
            success: false,
            error: `Товар с ID ${id} не найден`
        });
    }

    res.json({
        success: true,
        data: item
    });
};

const createItem = (req, res) => {
    const { name, quantity = 1, category = 'Разное' } = req.body;

    const newItem = {
        id: nextId++,
        name: name.trim(),
        quantity: parseInt(quantity) || 1,
        category: category.trim(),
        purchased: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    shoppingList.push(newItem);

    res.status(201).json({
        success: true,
        message: 'Товар успешно создан',
        data: newItem
    });
};

const updateItem = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            error: 'ID должен быть числом'
        });
    }

    const itemIndex = shoppingList.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Товар не найден'
        });
    }

    const { name, quantity, category, purchased } = req.body;
    const item = shoppingList[itemIndex];

    const updatedItem = {
        ...item,
        name: name !== undefined ? name.trim() : item.name,
        quantity: quantity !== undefined ? parseInt(quantity) : item.quantity,
        category: category !== undefined ? category.trim() : item.category,
        purchased: purchased !== undefined ? Boolean(purchased) : item.purchased,
        updatedAt: new Date().toISOString()
    };

    shoppingList[itemIndex] = updatedItem;

    res.json({
        success: true,
        message: 'Товар успешно обновлен',
        data: updatedItem
    });
};

const deleteItem = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            error: 'ID должен быть числом'
        });
    }

    const itemIndex = shoppingList.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Товар не найден'
        });
    }

    const deletedItem = shoppingList.splice(itemIndex, 1)[0];

    res.json({
        success: true,
        message: 'Товар успешно удален',
        data: deletedItem
    });
};

const togglePurchased = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            error: 'ID должен быть числом'
        });
    }

    const itemIndex = shoppingList.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Товар не найден'
        });
    }

    shoppingList[itemIndex].purchased = !shoppingList[itemIndex].purchased;
    shoppingList[itemIndex].updatedAt = new Date().toISOString();

    res.json({
        success: true,
        message: 'Статус покупки изменен',
        data: shoppingList[itemIndex]
    });
};

const getStats = (req, res) => {
    const totalItems = shoppingList.length;
    const purchasedItems = shoppingList.filter(item => item.purchased).length;
    const notPurchasedItems = totalItems - purchasedItems;

    const categories = {};
    shoppingList.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = 0;
        }
        categories[item.category]++;
    });

    res.json({
        success: true,
        data: {
            total: totalItems,
            purchased: purchasedItems,
            notPurchased: notPurchasedItems,
            byCategory: categories
        }
    });
};


const validateItem = (req, res, next) => {
    const { name, quantity } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'Название товара обязательно и должно быть не пустой строкой'
        });
    }

    if (quantity !== undefined) {
        const qty = parseInt(quantity);
        if (isNaN(qty) || qty <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Количество должно быть положительным числом'
            });
        }
    }

    next();
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    togglePurchased,
    getStats,
    validateItem
};