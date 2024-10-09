import express from "express";
import { authIfStudent, authIfTeacher } from "../middleware/authMiddleware.js";
import { AddGrad, EditGrad, GetAllUsers, GetAllUsersAverageGrads, GetAllUsersGrads, GetUserAverageGradById, GetUserGradById, RemoveGrad } from "../controllers/actionController.js";
const app = express();
const router = express.Router();
// for Teacher
/**
 * @swagger
 * /users/all:
 *  get:
 *      summary: get list of user
 *      responses:
 *          200:
 *              description: arr of users
 */
router.get('/all', authIfTeacher, GetAllUsers);
/**
 * @swagger
 * /users/grads:
 *  get:
 *      summary: get list of grads user
 *      responses:
 *          200:
 *              description: arr of grads users
 */
router.get('/grads', authIfTeacher, GetAllUsersGrads);
/**
 * @swagger
 * /users/average:
 *  get:
 *      summary: get list average grads of user
 *      responses:
 *          200:
 *              description: arr of average grads of users
 */
router.get('/average', authIfTeacher, GetAllUsersAverageGrads);
/**
 * @swagger
 * /users/addGrad/{id}:
 *  post:
 *      summary: add Grad to user
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to add grad
 *         schema:
 *           type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          subject:
 *                              type: string
 *                          grade:
 *                              type: number
 *      responses:
 *          201:
 *              description: grade of user
 */
router.post('/addGrad/:id', authIfTeacher, AddGrad);
/**
 * @swagger
 * /users/editGrad/{id}:
 *  put:
 *      summary: edit grade of user
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to edit grad
 *         schema:
 *           type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          subject:
 *                              type: string
 *                          grade:
 *                              type: number
 *      responses:
 *          201:
 *              description: you added the grade
 */
router.put('/editGrad/:id', authIfTeacher, EditGrad);
/**
 * @swagger
 * /users/removeGrad/{id}:
 *  delete:
 *      summary: delete grad of user
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete grad
 *         schema:
 *           type: string
 *      responses:
 *          200:
 *              description: you deleted the grade
 */
router.delete('/removeGrad/:id', authIfTeacher, RemoveGrad);
// for Student
/**
 * @swagger
 * /users/Self/grads/{id}:
 *  get:
 *      summary: get your grads
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to get your grads
 *         schema:
 *           type: string
 *      responses:
 *          200:
 *              description: there is all your grade
 */
router.get('/Self/grads/:id', authIfStudent, GetUserGradById);
/**
 * @swagger
 * /users/Self/average/{id}:
 *  get:
 *      summary: get your average grads
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to get your average grads
 *         schema:
 *           type: string
 *      responses:
 *          200:
 *              description: there is average of your grads
 */
router.get('/Self/average/:id', authIfStudent, GetUserAverageGradById);
/**
 * @swagger
 * /users/Self/remove/{id}:
 *  delete:
 *      summary: delete your account
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to deleted your account
 *         schema:
 *           type: string
 *      responses:
 *          200:
 *              description: you deleted your account
 */
router.delete('/Self/remove/:id', authIfStudent);
export default router;
