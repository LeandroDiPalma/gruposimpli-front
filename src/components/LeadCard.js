import React from 'react';
import Card from './Card';

function LeadCard({ lead }) {
    return (
        <Card
            title={`${lead.firstName} ${lead.lastName}`}
            subtitle={`Email: ${lead.email}`}
        >
            <p>Associated Post: {lead.post.title}</p>
            {lead.post.vehicle && <p>Associated Vehicle: {lead.post.vehicle.make}</p>}
            {lead.post.accessory && <p>Associated Accessory: {lead.post.accessory.name}</p>}
        </Card>
    );
}

export default LeadCard;
