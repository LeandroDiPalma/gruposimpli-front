import React, { useState, useEffect } from 'react';
import AccessoryCard from '../components/AccessoryCard';
import { getAccessories, createAccessory, updateAccessory, deleteAccessory } from '../api/accessoryApi';
import { useDealer } from '../context/DealerContext';
import FormModal from '../components/FormModal';

const AccessoriesList = () => {
    const { dealer } = useDealer();
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentAccessory, setCurrentAccessory] = useState(null);

    useEffect(() => {
        fetchAccessories();
        // eslint-disable-next-line 
    }, []);

    const fetchAccessories = async () => {
        const currentDealer = dealer ? dealer : JSON.parse(localStorage.getItem('selectedDealer'));
        try {
            const data = await getAccessories(currentDealer._id);
            setAccessories(data);
            setLoading(false);
        } catch (error) {
            setError(`Failed to fetch accessories: ${error.message}`);
            setLoading(false);
        }
    };

    const handleEdit = (accessory) => {
        setCurrentAccessory(accessory);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteAccessory(dealer._id, id);
            fetchAccessories();
        } catch (error) {
            setError(`Failed to delete accessory: ${error.message}`);
        }
    };

    const handleAdd = () => {
        setCurrentAccessory(null);
        setModalOpen(true);
    };

    const handleSave = async (accessoryData) => {
        if (currentAccessory) {
            await updateAccessory(dealer._id, currentAccessory._id, accessoryData);
        } else {
            await createAccessory(dealer._id, { ...accessoryData, dealer: dealer._id });
        }
        fetchAccessories();
        setModalOpen(false);
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const accessoryConfig = {
        type: 'Accessory',
        fields: {
            name: { label: 'Name', type: 'text' },
            description: { label: 'Description', type: 'text' },
            price: { label: 'Price', type: 'number' }
        }
    }

    return (
        <div>
            <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add New Accessory
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {accessories.map(accessory => (
                    <AccessoryCard key={accessory._id} accessory={accessory} onEdit={() => handleEdit(accessory)} onDelete={() => handleDelete(accessory._id)} />
                ))}
            </div>
            {isModalOpen && (
                <FormModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                    entity={currentAccessory}
                    entityConfig={accessoryConfig}
                />
            )}
        </div>
    );
}

export default AccessoriesList;