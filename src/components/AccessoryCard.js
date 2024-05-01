import React from 'react';
import Card from './Card';

const AccessoryCard = ({ accessory, onEdit, onDelete }) => {
    return (
        <Card
            title={accessory.name}
            subtitle={`Price: $${accessory.price}`}
            className="mb-4 md:mb-0"
        >
            <p>{accessory.description}</p>
            <img 
                src={`https://picsum.photos/200?random=${accessory._id}`} 
                alt={accessory.name}
                className="w-full h-auto object-cover rounded-lg mt-2"
            />
            <button onClick={() => onEdit(accessory)} className="text-blue-500 hover:text-blue-600 mr-4">Edit</button>
            <button onClick={() => onDelete(accessory._id)} className="text-red-500 hover:text-red-600">Delete</button>
        </Card>
    );
}

export default AccessoryCard;
