import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getEmployees, addEmployee, editEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController.js';
const router = express.Router();

router.post('/add', authMiddleware, addEmployee)
router.get('/', authMiddleware, getEmployees)
router.get('/:id', authMiddleware, editEmployee)
router.put('/:id', authMiddleware, updateEmployee)
router.delete('/:id', authMiddleware, deleteEmployee)

export default router;