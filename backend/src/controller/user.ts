import  { Request, Response } from "express";    
import {  getUserByEmail, insertUser , setUserPassword} from "../services/user";
import { User } from "../constants/interfaces"
import { generateToken, verifyToken } from "../middleware/auth";
import { comparePassword, hashPassword } from "../services/bcrypt";
import { sendMail } from "../services/nodemailer";


export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const hashedPassword = await hashPassword(password);

        const user = await insertUser(username, email, hashedPassword);

        if(user.affectedRows === 0) {
            throw new Error("User not created");
        }
        res.status(200).json({ message: "User created successfully", user });
        
    } catch (error: any) {
        console.log(error);

        if(error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "email already exists" });
        }

        res.status(500).json({ message: "Internal server error",error:error });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const results = await getUserByEmail(email);
        const user: User = results[0]; 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await comparePassword(password,user.password);

        if (!isMatch){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken({userId:user.id});
        res.status(200).json({ 
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error:any) {
        res.status(500).json({ message: "Internal server error",error:error.message});
    }

}

export const generateResetToken = async (req: Request, res: Response) => {

    try{
        const { email } = req.body;
        const results = await getUserByEmail(email);
        const user: User = results[0]; 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = generateToken({userId:user.id});
        const subject = user.username;
        
        await sendMail(user.email,subject,token);

        res.status(200).json({ 
            message: "Email sent on your registered email address",
        });

    }catch(error:any){
        res.status(500).json({ message: "Internal server error",error:error.message});
    }

}

export const resetPassword = async (req: Request, res: Response) => {
    try{
        const { password } = req.body;
        let token = req.headers['authorization'];
        if(!token){
            return res.status(401).json({ message: "Token not provided" });
        }
        token = token && token.split(' ')[1];
        const user = verifyToken(token);
        if(!user){
            return res.status(403).json({ message: "Invalid token" });
        }
        const userId = user.userId;
        const hashedPassword = await hashPassword(password);
        const results = await setUserPassword(userId,hashedPassword);

        if(results.affectedRows === 0) {
            throw new Error("Password not updated");
        }
        res.status(200).json({ message: "Password updated successfully"});

    }catch(error:any){
        if(error.name === "TokenExpiredError"){
            return res.status(403).json({ message: "Token expired" });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error",error:error.message});
    }


}