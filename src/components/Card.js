import React from 'react';

const Card = ({ title, subtitle, children, className = "" }) => {
    return (
        <div className="max-w-sm md:max-w-md lg:w-96 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
                <h2 className="text-xl md:text-2xl font-bold mb-2">{title}</h2>
                <p className="text-gray-600 text-base md:text-lg">{subtitle}</p>
            </div>
            <div className="p-4 overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default Card;
