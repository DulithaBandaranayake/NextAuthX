import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { error } from "console";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest){
    try {

        const requestBody = await request.json()
        const {email, password, confirmpassword} = requestBody

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status:400})
        }

        if(password !== confirmpassword){
            return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
        }
        
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash
        (password, salt)

        const newUser = new User({
            email,
            password: hashedPassword
        })

        const saveUser = await newUser.save()

        await sendEmail({email, emailType: "VERIFY", userId: saveUser._id})

        return NextResponse.json({message: "User created successfully", success: true, saveUser})

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}