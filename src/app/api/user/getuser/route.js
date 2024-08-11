import { NextResponse } from "next/server";
import connectToDB from "@/DB/connection";
import User from "@/model/user";
import { cookies } from 'next/headers'



export async function GET(request) {
    try {
        await connectToDB(process.env.MONGO_URI);

        const email = request.headers.get("email");

        const cookieStore = cookies()
        const token = cookieStore.get('token')
        console.log("token: ", token)

        const user = await User.findOne({ email }).populate('applied');
        if (!user) {
            return NextResponse.json({
                msg: "User not found",
                status: false,
            });
        }

        return NextResponse.json(user);

    } catch (error) {
        return NextResponse.json({
            msg: "An error occurred",
            error: error.message,
            status: false,
        });
    }
}
