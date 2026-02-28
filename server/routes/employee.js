import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getEmployees,
  addEmployee,
  editEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
  fetchEmployeesByDepID,
} from "../controllers/employeeController.js";
const router = express.Router();

router.post("/add", authMiddleware, addEmployee);
router.get("/", authMiddleware, getEmployees);
router.get("/:id", getEmployee);
router.put("/:id", authMiddleware, updateEmployee);
router.delete("/:id", authMiddleware, deleteEmployee);
router.get("/department/:id", authMiddleware, fetchEmployeesByDepID);

export default router;
