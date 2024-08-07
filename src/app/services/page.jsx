"use client";

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { Services } from "../../../public/services";

const ServicesPage = () => {
    return (
        <>
            <Navbar />
            <section className="text-white bg-gradient-to-b from-blue-600 to-indigo-900 body-font min-h-screen">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-4xl text-3xl font-bold title-font mb- text-white italic">Our Services</h1>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {Services.map((item, index) => (
                            <div key={index} className="p-4 lg:w-1/3 md:w-1/2 w-full">
                                <div className="bg-transparent transform transition-all hover:scale-105 hover:shadow-xl h-full flex items-center hover:border-gray-800 p-6 rounded-lg hover:bg-gray-800">
                                    <Image
                                        alt={item.name}
                                        className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                        src={item.image}
                                        width={80}
                                        height={80}
                                    />
                                    <div className="flex-grow">
                                        <h2 className="text-white text-xl font-semibold mb-2">{item.name}</h2>
                                        <p className="text-gray-400 text-base">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServicesPage;
