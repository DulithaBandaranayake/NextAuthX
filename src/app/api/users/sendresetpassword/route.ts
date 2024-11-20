import {connect} from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const {email} = requestBody;

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not found."}, {status:400})
        }

        const mailSend = await sendEmail({email, emailType: "RESET", userId: user._id})

        return NextResponse.json({message: "Email send successfully", success: true})

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}