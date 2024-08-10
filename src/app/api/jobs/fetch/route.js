import { NextResponse } from "next/server";
import connectToDB from "@/DB/connection";
import User from "@/model/user";
import Job from "@/model/job";

export async function GET(request) {
    try {
        await connectToDB(process.env.MONGO_URI);

        const email = request.headers.get("email");

        // const user = await User.findOne({ email }).populate('applied');
        // if (!user) {
        //     return NextResponse.json({
        //         msg: "User not found",
        //         status: false,
        //     });
        // }

        const jobs = await Job.find({})

        return NextResponse.json(jobs);

    } catch (error) {
        return NextResponse.json({
            msg: "An error occurred",
            error: error.message,
            status: false,
        });
    }
}
