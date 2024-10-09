import express from "express";
import { login, register } from "../controllers/authController.js";
const app = express();
const router = express.Router();
/**
 * @swagger
 * /login:
 *  post:
 *      summary: login user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fullName:
 *                              type: string
 *                          password:
 *                              type: number
 *      responses:
 *          201:
 *              description: you login
 */
router.route("/login").post(login);
/**
 * @swagger
 * /register:
 *  post:
 *      summary: create new user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fullName:
 *                              type: string
 *                          passportId:
 *                              type: string
 *                          password:
 *                              type: number
 *                          role:
 *                              type: string
 *      responses:
 *          201:
 *              description: new user is added
 */
router.route("/register").post(register);
export default router;
