import { NextResponse } from "next/server";
import connectToDB from "../../../DB/connection";
import User from "../../../model/user";
import Job from "../../../model/job";

export async function POST(request) {
    try {
        await connectToDB(process.env.MONGO_URI);

        const reqBody = await request.json();
        const { name, email, jobId } = reqBody;

        if (!name || !email || !jobId) {
            return NextResponse.json({
                msg: "Invalid response",
                status: false,
            });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return NextResponse.json({
                msg: "Invalid response, Create account first",
                status: false,
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return NextResponse.json({
                msg: "Invalid job ID",
                status: false,
            });
        }

        if (!existingUser.added) {
            existingUser.added = [];
        }

        if (!existingUser.added.includes(jobId)) {
            existingUser.added.push(jobId);
            await existingUser.save();
        }

        return NextResponse.json({
            msg: "Job applied successfully",
            status: true,
        });

    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json({
            msg: "An error occurred",
            error: error.message,
            status: false,
        });
    }
}
