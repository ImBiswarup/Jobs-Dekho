import User from "@/app/model/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import connectToDB from "@/app/DB/connection";

export async function POST(request) {
    try {
        await connectToDB(process.env.MONGO_URI);

        const reqBody = await request.json();
        const { name, email, password } = reqBody;

        if (!name || !email || !password) {
            return NextResponse.json({ msg: "Invalid information", status: 400 });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ msg: "User already exists", status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword });

        console.log(newUser)

        return NextResponse.json({ msg: "User created successfully", status: 200, newUser });
    } catch (error) {
        console.error("Error in API:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
