import User from "../../../../model/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import connectToDB from "../../../../DB/connection";

export async function POST(request) {
    try {
        await connectToDB(process.env.MONGO_URI);

        const reqBody = await request.json();
        const { name, email, role, password } = reqBody;

        if (!name || !email || !role || !password) {
            return NextResponse.json({ msg: "Invalid information", status: false });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ msg: "User already exists", status: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword, role });

        console.log(newUser)

        return NextResponse.json({
            msg: "User created successfully",
            user: newUser
        });

    } catch (error) {
        console.error("Error in API:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
