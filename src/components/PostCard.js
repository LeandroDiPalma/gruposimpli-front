import React from 'react';
import Card from './Card';

const PostCard = ({ post, onEdit, onDelete  }) => {
    return (
        <Card
            title={post.title}
            subtitle={post.content}
        >
            {post.vehicle && <p>Vehicle: {post.vehicle.make} {post.vehicle.model}</p>}
            {post.accessory && <p>Accessory: {post.accessory.name}</p>}
            <button onClick={() => onEdit(post)} className="text-blue-500 hover:text-blue-600 mr-4">Edit</button>
            <button onClick={() => onDelete(post._id)} className="text-red-500 hover:text-red-600">Delete</button>
        </Card>
    );
}

export default PostCard;
