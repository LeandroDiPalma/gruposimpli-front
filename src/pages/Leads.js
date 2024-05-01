import React, { useState, useEffect } from 'react';
import { getLeads } from '../api/leadApi';
import LeadCard from '../components/LeadCard';
import { useDealer } from '../context/DealerContext';

const LeadsList = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { dealer } = useDealer();

    useEffect(() => {
        const fetchLeads = async () => {
            const currentDealer = dealer ? dealer : JSON.parse(localStorage.getItem('selectedDealer'));

            try {
                const data = await getLeads(currentDealer._id);
                setLeads(data);
                setLoading(false);
            } catch (error) {
                setError(`Failed to fetch leads: ${error.message}`);
                setLoading(false);
            }
        };

        fetchLeads();
        // eslint-disable-next-line
    }, []);

    if (loading) return <p>Loading leads...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-lg font-semibold text-gray-800">Leads of Dealer {dealer.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {leads.map(lead => (
                    <LeadCard key={lead._id} lead={lead} />
                ))}
            </div>
        </div>
    );
}

export default LeadsList;
