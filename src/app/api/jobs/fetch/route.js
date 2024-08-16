import { NextResponse } from "next/server";
import connectToDB from "../../../../DB/connection";
import Job from "../../../../model/job";

export async function GET() {
    try {
        await connectToDB(process.env.MONGO_URI);

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
