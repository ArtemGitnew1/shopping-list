const express = require('express');
const router = express.Router();
const {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    togglePurchased,
    getStats,
    validateItem
} = require('../controllers/shoppingListController');


router.get('/', getAllItems);


router.get('/:id', getItemById);


router.post('/', validateItem, createItem);


router.put('/:id', validateItem, updateItem);


router.delete('/:id', deleteItem);


router.patch('/:id/toggle', togglePurchased);


router.get('/stats/summary', getStats);

module.exports = router;