import UserModel from '../models/usermodel'
import bcrypths from "bcryptjs"
import verifyEmailTemplate from '../utils/verifyEmailTemplate'
export async function registerUserController(request,response){
    try {
        const {name,email,password} =request.body
        if(!name || !email || !password){
            return response.status(400).json({
                message : "Provide Email, Name, Password",
                error : true,
                success : false
            })
        }

        // If it's an existing account 
        const user = await UserModel.findOne({email})
        if(user){
            return response.status(400).json({
                message : "Email already exists",
                error : true,
                success : false
            })
        }
        const salt = await bcryptjs.genSalt(10);  
        const hashPassword = await bcryptjs.hash(password,salt);//password conversion to hash
        const payload = {
            name,
            email,
            password : hashPassword
        }
        //saving user details to mongodb
        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;
        //mailing
        const verifyEmail = await sendEmail({
            sendTo: email,
            subject : "Verification Email form ByteKart",
            html: verifyEmailTemplate({
                name,
                url: VerifyEmailUrl
            }),
        })
        return response.json({
            message : "Registration Successfull",
            error : false,
            success : true,
            data : save
        })


    }
    catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}