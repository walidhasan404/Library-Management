import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Banner = () => {
    const images = [
        "https://i.ibb.co/TMbk7MP/pexels-pixabay-220326.jpg",
        "https://i.ibb.co/ZzCmvXz/pexels-pixabay-159711.jpg",
        "https://i.ibb.co/JmzMs1Y/pexels-pixabay-159775.jpg",
        "https://i.ibb.co/7GsXzMB/pexels-pixabay-207732.jpg",
        "https://i.ibb.co/VV92fXY/pexels-ivo-rainha-527110-1261180.jpg"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative w-full h-[80vh] overflow-hidden my-4">
            <div className="relative w-full h-full">
                {images.map((src, index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentIndex ? 1 : 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            className="w-full h-full object-cover filter brightness-75"
                            src={src}
                            alt={`Banner ${index + 1}`}
                        />
                        {index === currentIndex && (
                            <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <motion.h2
                                    className="text-white text-2xl md:text-4xl font-bold mb-2 shadow-md"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    Welcome to Our Professional Space
                                </motion.h2>
                                <motion.p
                                    className="text-white text-base md:text-xl mb-4 shadow-md"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    Providing Excellence in Every Service
                                </motion.p>
                                <Link to="/about">
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.6 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        Welcome
                                    </button>
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
            >
                &#10094;
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
            >
                &#10095;
            </button>
        </div>
    );
};

export default Banner;
