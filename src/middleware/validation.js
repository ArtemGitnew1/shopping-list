const validateItem = (req, res, next) => {
    const { name, quantity } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            error: 'Название товара обязательно и должно быть строкой'
        });
    }

    if (quantity !== undefined && (typeof quantity !== 'number' || quantity <= 0)) {
        return res.status(400).json({
            error: 'Количество должно быть положительным числом'
        });
    }

    next();
};

module.exports = { validateItem };