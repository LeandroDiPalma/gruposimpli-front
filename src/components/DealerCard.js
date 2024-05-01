import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDealer } from '../context/DealerContext';
import Card from './Card';

const DealerCard = ({ dealer, onEdit, onDelete }) => {
    const { updateDealerContext } = useDealer();
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        updateDealerContext(dealer);
        navigate(path);
    };

    return (
        <Card
            title={dealer.name}
            subtitle={dealer.location}
            className="mb-4"
        >
            <div className="flex flex-wrap items-center justify-start space-x-4">
                <button onClick={() => handleNavigate(`/dealers/${dealer._id}/vehicles`)}
                    className="text-blue-500 hover:text-blue-600">Vehicles</button>
                <button onClick={() => handleNavigate(`/dealers/${dealer._id}/accessories`)}
                    className="text-blue-500 hover:text-blue-600">Accessories</button>
                <button onClick={() => handleNavigate(`/dealers/${dealer._id}/posts`)}
                    className="text-blue-500 hover:text-blue-600">Posts</button>
                <button onClick={() => handleNavigate(`/dealers/${dealer._id}/leads`)}
                    className="text-blue-500 hover:text-blue-600">Leads</button>
            </div>
            <div className="flex flex-wrap items-center justify-start space-x-4">
                <button onClick={() => onEdit(dealer)}
                    className="text-green-500 hover:text-green-700">Edit</button>
                <button onClick={() => onDelete(dealer._id)}
                    className="text-red-500 hover:text-red-700">Delete</button>
            </div>
        </Card>
    );
};

export default DealerCard;
