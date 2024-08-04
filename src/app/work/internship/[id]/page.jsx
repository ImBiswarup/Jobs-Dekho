import React from 'react'
import { Data } from '../../../../../public/data';


const singleJob = ({ params }) => {

    const job = Data.find((job) => job.id === params.id)
    console.log(job, params.id)

    return (
        <div className='flex flex-col'>
            <h2> this page is for internship id : {job.id} </h2>
            <h2> this page is for internship name : {job.name} </h2>
            <h2> this page is for internship type : {job.type} </h2>
            <h2> this page is for internship duration : {job.duration} </h2>
            <h2> this page is for internship description : {job.description} </h2>
        </div>
    )
}

export default singleJob