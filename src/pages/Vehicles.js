import React, { useState, useEffect } from 'react';
import VehicleCard from '../components/VehicleCard';
import { getVehicles, deleteVehicle, updateVehicle, createVehicle } from '../api/vehicleApi';
import { useDealer } from '../context/DealerContext';
import FormModal from '../components/FormModal';
import { useNotification } from '../context/NotificationContext';

const VehiclesList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const { dealer } = useDealer()
    const { addNotification } = useNotification();
    useEffect(() => {
        fetchVehicles();
        // eslint-disable-next-line
    }, []);


    const fetchVehicles = async () => {
        const currentDealer = dealer ? dealer : JSON.parse(localStorage.getItem('selectedDealer'));
        const data = await getVehicles(currentDealer._id);
        setVehicles(data);
    };

    const handleEdit = (vehicle) => {
        setCurrentVehicle(vehicle);
        setModalOpen(true);
    };

    const handleDelete = async (vehicleId) => {
        await deleteVehicle(dealer._id, vehicleId);
        addNotification('Vehicle deleted successfully!', 'success');
        fetchVehicles();
    };

    const handleNewVehicle = () => {
        setCurrentVehicle(null);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSave = async (vehicleData) => {
        if (currentVehicle) {
            await updateVehicle(dealer._id, currentVehicle._id, vehicleData);
            addNotification('Vehicle updated successfully!', 'success');
        } else {
            await createVehicle(dealer._id, vehicleData);
            addNotification('Vehicle created successfully!', 'success');
        }
        handleCloseModal();
        fetchVehicles();
    };

    const vehicleConfig = {
        type: 'Vehicle',
        fields: {
            make: { label: 'Make', type: 'text' },
            model: { label: 'Model', type: 'text' },
            year: { label: 'Year', type: 'number' },
            price: { label: 'Price', type: 'number' }
        }
    };

    return (
        <div className="p-4">
            <button onClick={handleNewVehicle} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create Vehicle
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {vehicles.map(vehicle => (
                    <VehicleCard
                        key={vehicle._id}
                        vehicle={vehicle}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            {isModalOpen && (
                <FormModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    entity={currentVehicle}
                    entityConfig={vehicleConfig}
                />
            )}
        </div>
    );
};

export default VehiclesList;
