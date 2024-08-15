"use client";
import { Services } from "../../../public/services";

const ServicesPage = () => {
    return (
        <>
            <section className="text-white bg-gradient-to-b from-blue-600 to-indigo-900 body-font min-h-screen md:pt-20 pt-36"> 
                <div className="container px-5 mx-auto">
                    <div className="flex flex-col text-center w-full md:mb-8 mb-2">
                        <h1 className="sm:text-4xl text-3xl font-bold title-font mb-4 text-white italic">Our Services</h1>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {Services.map((item, index) => (
                            <div key={index} className="p-5 lg:w-1/3 md:w-1/2 w-full">
                                <div className="bg-transparent transform transition-all ease-in hover:scale-105 hover:shadow-xl h-full flex items-center hover:border-gray-800 p-6 rounded-lg hover:bg-blue-700">
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
