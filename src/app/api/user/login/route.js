import User from "@/model/user";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/DB/connection";

export async function POST(request) {
    try {
        await connectToDB(process.env.MONGO_URI);

        const reqBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json({
                msg: "Invalid email or password",
                status: 400
            });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return NextResponse.json({
                msg: "User not found",
                status: 400
            });
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);

        if (!validPassword) {
            return NextResponse.json({
                msg: "Invalid password",
                status: 400
            });
        }

        return NextResponse.json({
            msg: "Login successful",
            status: 200,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            }
        });

    } catch (error) {
        console.error("Error in API:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
