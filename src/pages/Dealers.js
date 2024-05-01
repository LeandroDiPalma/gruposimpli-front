import React, { useState, useEffect } from 'react';
import DealerCard from '../components/DealerCard';
import { getDealers, deleteDealer, updateDealer, createDealer } from '../api/dealerApi'; 
import { useNotification } from '../context/NotificationContext';
import { useDealer } from '../context/DealerContext';
import FormModal from '../components/FormModal';

const DealersList = () => {
    const [dealers, setDealers] = useState([]);
    const [currentDealer, setCurrentDealer] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const { addNotification } = useNotification();
    const { updateDealerContext, dealer } = useDealer();
    useEffect(() => {
        fetchDealers();
        // eslint-disable-next-line
    }, []);

    const fetchDealers = async () => {
        const data = await getDealers();
        if (!dealer)
            updateDealerContext(data[0])
        setDealers(data);
    };

    const handleNewDealer = () => {
        setCurrentDealer(null);
        setModalOpen(true);
    };

    const handleEdit = (dealer) => {
        setCurrentDealer(dealer);
        setModalOpen(true);
    };

    const handleDelete = async (dealerId) => {
        await deleteDealer(dealerId);
        addNotification('Dealer deleted successfully!', 'success');
        fetchDealers();
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSave = async (dealerData) => {
        if (currentDealer) {
            await updateDealer(currentDealer._id, dealerData);
            addNotification('Dealer updated successfully!', 'success');
        } else {
            await createDealer(dealerData);
            addNotification('Dealer created successfully!', 'success');
        }
        handleCloseModal();
        fetchDealers();
    };

    const dealerConfig = {
        type: 'Dealer',
        fields: {
            name: { label: 'Name', type: 'text' },
            location: { label: 'Location', type: 'text' }
        }
    };

    return (
        <div className="p-4">
            <button onClick={handleNewDealer} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Create a Dealer
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dealers.map(dealer => (
                    <DealerCard
                        key={dealer._id}
                        dealer={dealer}
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
                    entity={currentDealer}
                    entityConfig={dealerConfig}
                />
            )}
        </div>
    );
};

export default DealersList;