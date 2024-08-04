import React from 'react'
import { Data } from '../../../../../public/data'


const singleJob = ({ params }) => {

    const job = Data.find((job) => job.id === params.id)
    console.log(job)

    return (
        <div className='flex flex-col'>
            <h2> this page is for job id : {job.id} </h2>
            <h2> this page is for job name : {job.name} </h2>
            <h2> this page is for job type : {job.type} </h2>
            <h2> this page is for job duration : {job.duration} </h2>
            <h2> this page is for job description : {job.description} </h2>
        </div>
    )
}

export default singleJob
