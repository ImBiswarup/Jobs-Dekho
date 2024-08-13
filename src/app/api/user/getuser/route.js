import { NextResponse } from "next/server";
import connectToDB from "@/DB/connection";
import User from "@/model/user";
import { cookies } from 'next/headers';
import jwt from "jsonwebtoken";

export async function GET() {
    try {
        await connectToDB(process.env.MONGO_URI);

        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({
                msg: "Authentication token missing",
                status: false,
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decodedToken);

        const email = decodedToken.email;

        const user = await User.findOne({ email })
            .populate('applied')
            .populate('added');

        if (!user) {
            return NextResponse.json({
                msg: "User not found",
                status: false,
            });
        }

        return NextResponse.json({
            user,
            token: decodedToken,
        });

    } catch (error) {
        return NextResponse.json({
            msg: "An error occurred",
            error: error.message,
            status: false,
        });
    }
}
