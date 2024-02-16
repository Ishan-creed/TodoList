const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.post('/create',todoController.createTodo);
router.get('/retrieve',todoController.getTodos);
router.get('/count',todoController.getTodoCount);
router.delete('/delete',todoController.deleteTodo);
router.patch('/update',todoController.updateTodo);

module.exports = router;