import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { match } from "assert";

connect()

export async function POST(request: NextRequest) {
    try {

        const requestBody = await request.json();
        const {token, password, confirmpassword} = requestBody;

        const user = await User.findOne({forgotPasswordToken: token,
            forgotPasswordTokenExpiry: {$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        if (password !== confirmpassword) {
            return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash
        (password, salt)

        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        await user.save();

        return NextResponse.json({ message: "Password updated successfully", success: true });

        
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500});
    }
}