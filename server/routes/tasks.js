const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { verifyToken } = require('../middleware/auth');

// All task routes are protected - require authentication
router.use(verifyToken);

// POST /api/tasks - Create a new task
router.post('/', createTask);

// GET /api/tasks - Get all tasks with search, filter, sort
router.get('/', getTasks);

// GET /api/tasks/:id - Get single task by ID
router.get('/:id', getTaskById);

// PUT /api/tasks/:id - Update task
router.put('/:id', updateTask);

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', deleteTask);

module.exports = router;
