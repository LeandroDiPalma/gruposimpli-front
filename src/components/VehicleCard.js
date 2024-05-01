import React from 'react';
import Card from './Card';

const VehicleCard = ({ vehicle, onEdit, onDelete }) => {
    return (
        <Card
            title={`${vehicle.make} ${vehicle.model}`}
            subtitle={`Year: ${vehicle.year} - Price: $${vehicle.price}`}
        >
            <img
                src={`https://picsum.photos/200?random=${vehicle._id}`}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-auto object-cover rounded-lg mt-2"
            />
            <button onClick={() => onEdit(vehicle)} className="text-blue-500 hover:text-blue-600 mr-4">Edit</button>
            <button onClick={() => onDelete(vehicle._id)} className="text-red-500 hover:text-red-600">Delete</button>

        </Card>
    );
}

export default VehicleCard;
