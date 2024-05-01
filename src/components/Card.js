import React from 'react';

const Card = ({ title, subtitle, children, className = "" }) => {
    return (
        <div className={`p-4 bg-white shadow rounded-lg ${className}`}>
            <h2 className="text-xl font-bold">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
            {children}
        </div>
    );
};

export default Card;
