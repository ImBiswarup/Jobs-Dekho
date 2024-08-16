import Job from "../../../../model/job";
import User from "../../../../model/user"; 
import { NextResponse } from "next/server";
import connectToDB from "../../../../DB/connection";

export async function POST(request) {
    try {
        await connectToDB(process.env.MONGO_URI);

        const reqBody = await request.json();
        const { name, type, duration, description, tags, createdBy } = reqBody;

        if (!name || !type || !duration || !description || !tags || !createdBy) {
            return NextResponse.json({
                msg: "All fields are required.",
                status: false,
            }, { status: 400 });
        }

        // Create the job
        const createdJob = await Job.create({
            createdBy, name, type, duration, description, tags
        });

        // Update the user to include the job in the "added" array
        await User.findByIdAndUpdate(createdBy, {
            $push: { added: createdJob._id }
        });

        // Populate the createdBy field in the response
        const populatedJob = await Job.findById(createdJob._id)
            .populate({ path: 'createdBy', options: { strictPopulate: false } })
            .exec();


        return NextResponse.json({
            job: populatedJob,
            status: true,
        }, { status: 201 });

    } catch (error) {
        console.error("Error in API:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
