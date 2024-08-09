import mongoose from "mongoose";
import Job from "@/model/job";
import { NextResponse } from "next/server";
import connectToDB from "@/DB/connection";

export async function POST(request) {
    try {
        await connectToDB(process.env.MONGO_URI);

        const reqBody = await request.json();  // Correctly parse the JSON body
        const { name, type, duration, description, tags } = reqBody;

        // Validate required fields
        if (!name || !type || !duration || !description || !tags) {
            return NextResponse.json({
                msg: "All fields are required.",
                status: false,
            }, { status: 400 });
        }

        // Create and save the job
        const createdJob = await Job.create({
            name, type, duration, description, tags
        });

        return NextResponse.json({
            job: createdJob,
            status: true
        }, { status: 201 });

    } catch (error) {
        console.error("Error in API:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
