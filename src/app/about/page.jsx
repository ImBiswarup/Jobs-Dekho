"use client"

import Navbar from '@/components/Navbar'
import Image from 'next/image'

const AboutPage = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-blue-600 to-indigo-900 text-white p-6">
                <header className="text-center mt-10 justify-center">
                    <h1 className="text-5xl font-extrabold">About Us</h1>
                </header>

                <main className="flex flex-col lg:flex-row items-center w-full max-w-6xl space-y-12 lg:space-y-0 lg:space-x-12 bg-white bg-opacity-10 p-8 rounded-lg shadow-lg mt-16">

                    <section className="flex-1">
                        <h2 className="text-4xl italic font-semibold mb-6">Our Motto</h2>
                        <p className="text-lg leading-relaxed">
                            Our mission is to simplify the process of job searching. We understand the struggles and challenges involved in finding the right job, and we are here to make it easier for you. With a user-friendly platform and a wealth of resources, we strive to connect job seekers with their dream jobs effortlessly.
                        </p>
                    </section>

                    <section className="flex-1 flex flex-col items-center text-center">
                        <Image
                            src="https://res.cloudinary.com/djrdw0sqz/image/upload/v1722104518/myImg_lbppig.webp"
                            alt="Inspirational image"
                            width={300}
                            height={300}
                            className="rounded-full mb-6 border-4 border-white shadow-lg"
                        />
                        <blockquote className="italic text-lg font-medium">
                            "Success is not final, failure is not fatal: It is the courage to continue that counts." ~ <strong>Biswarup Ghosh</strong>
                        </blockquote>
                    </section>
                </main>
            </div>
        </>
    )
}

export default AboutPage
