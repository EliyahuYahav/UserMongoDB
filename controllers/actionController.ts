import { Request, Response } from "express";
import { AddGradToStudent, allGradsAverageUsers, allGradsUsers, AllUsers, EditGradStudent, findUserAverageGrade, findUserGrade, RemoveGradStudent, RemoveStudent } from "../services/actionServices.js";

export const GetAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const allUsers = await AllUsers() 
        res.status(200).json({ data: allUsers, success: true });
    } catch (error) {
        res.status(400).json({ message: "you have a problem to get all users" });
    }
}

export const GetAllUsersGrads = async (req: Request, res: Response): Promise<void> =>{
    try {
        const allGrads = await allGradsUsers();
        res.status(200).json({ data: allGrads, success: true });
    } catch (error) {
        res.status(400).json({ message: "you have a problem to get all grads of users" });
    }
}

export const GetAllUsersAverageGrads = async (req: Request, res: Response): Promise<void> =>{
    try {
        const allGrads = await allGradsAverageUsers();
        res.status(200).json({ data: allGrads, success: true });
    } catch (error) {
        res.status(400).json({ message: "you have a problem to get all average grads of users" });
    }
}

export const AddGrad = async (req: Request, res: Response):Promise<void> =>{
    try {
        await AddGradToStudent(req.params.id, req.body)
        res.status(200).json({ massage: "you add the grade" });
    } catch (error) {
        res.status(400).json({ message: "you have a problem to add grad to this user" });
    }
}

export const RemoveGrad = async (req: Request, res: Response):Promise<void> =>{
    try {
        const subject = req.body.subject
        const student = await RemoveGradStudent(req.params.id, subject)
        res.status(200).json({student: student, massage: "you remove the grade" });
    } catch (error) {
        res.status(400).json({ message: "you have a problem to delete grad from this user" });
    }
}

export const EditGrad = async (req: Request, res: Response):Promise<void> =>{
    try {
        const student = await EditGradStudent(req.params.id, req.body)
        res.status(200).json({student: student, massage: "you edit the grade" });
    } catch (error) {
        res.status(400).json({ message: "you have a problem to edit the grad to this user" });
    }
}

export const GetUserGradById = async (req: Request, res: Response): Promise<void> => {
    try {
        const User = await findUserGrade(req.params.id)
        res.status(200).json({ data: User, success: true });
    } catch (error) {
        res.status(400).json({ message: "you have a problem to get the User" });
    }
}

export const GetUserAverageGradById = async (req: Request, res: Response): Promise<void> => {
    try {
        const User = await findUserAverageGrade(req.params.id)
        res.status(200).json({ data: User, success: true });
    } catch (error) {
        res.status(400).json({ message: "you have a problem to get the User" });
    }
}

export const RemoveUser = async (req: Request, res: Response):Promise<void> =>{
    try {
        const student = await RemoveStudent(req.params.id)
        res.status(200).json({student: student, massage: "you delete your account" });
    } catch (error) {
        res.status(400).json({ message: "you have a problem to delete this user" });
    }
}
