import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { error } from "console";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {

        const requestBody = await request.json();
        const {email, password} = requestBody;

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not found."}, {status:400})
        }

        if (!user.isVerifed){
            return NextResponse.json({error: "User does not verify."}, {status:400})
        }

        const validatePassword = await bcryptjs.compare
        (password, user.password)

        if(!validatePassword){
            return NextResponse.json({error: "User password incorrect."}, {status:400})
        }

        const tokenData = {
            id: user._id
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1h"})

        const response = NextResponse.json({message: "Login successfull", success: true,})
        response.cookies.set("token", token, {httpOnly: true, })
        return response;
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}



