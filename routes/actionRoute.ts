import express, { Application, Router } from "express";
import {authIfStudent, authIfTeacher} from "../middleware/authMiddleware.js";
import { AddGrad, EditGrad, GetAllUsers, GetAllUsersAverageGrads, GetAllUsersGrads, GetUserAverageGradById, GetUserGradById, RemoveGrad } from "../controllers/actionController.js";

const app: Application = express();
const router: Router = express.Router();

// for Teacher
router.get('/all', authIfTeacher ,GetAllUsers)
router.get('/grads', authIfTeacher ,GetAllUsersGrads)
router.get('/average', authIfTeacher ,GetAllUsersAverageGrads)
router.post('/addGrad/:id', authIfTeacher, AddGrad)
router.put('/editGrad/:id', authIfTeacher, EditGrad)
router.delete('/removeGrad/:id', authIfTeacher, RemoveGrad)

// for Student
router.get('/Self/grads/:id', authIfStudent ,GetUserGradById)
router.get('/Self/average/:id', authIfStudent ,GetUserAverageGradById)
router.delete('/Self/remove/:id', authIfStudent, )

export default router;