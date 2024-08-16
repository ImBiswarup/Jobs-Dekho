import connectToDB from "../../../DB/connection";
import Message from "../../../model/message";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectToDB(process.env.MONGO_URI);

        const reqBody = await request.json();
        const { email, subject, message } = reqBody;

        if (!email || !message) {
            return NextResponse.json({
                msg: "Invalid request",
                status: 400
            });
        }

        const newMessage = await Message.create({
            email, subject, message
        });

        return NextResponse.json({
            msg: "Message sent successfully",
            status: 200,
            newMessage
        });
    } catch (error) {
        console.error("Error in API:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
