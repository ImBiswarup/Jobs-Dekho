import User from "@/model/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import connectToDB from "@/DB/connection";

export async function POST(request) {
    try {
        await connectToDB(process.env.MONGO_URI);

        const reqBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json({
                msg: "Invalid email or password",
                status: false
            });
        }

        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return NextResponse.json({
                msg: "User not found",
                status: false
            });
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);

        if (!validPassword) {
            return NextResponse.json({
                msg: "Invalid password",
                status: false
            });
        }

        return NextResponse.json({
            msg: "Login successful",
            status: true,
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
