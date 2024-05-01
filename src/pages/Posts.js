// Example usage in PostsList component
import React, { useState, useEffect } from 'react';
import { useDealer } from '../context/DealerContext';
import { getPosts, createPost, updatePost, deletePost } from '../api/postApi';
import PostCard from '../components/PostCard';
import FormModal from '../components/FormModal';
import { useNotification } from '../context/NotificationContext';

const PostsList = () => {
    const { dealer } = useDealer();
    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    const [error, setError] = useState('');

    const [isModalOpen, setModalOpen] = useState(false);
    const { addNotification } = useNotification();

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line
    }, []);

    const fetchPosts = async () => {
        const currentDealer = dealer ? dealer : JSON.parse(localStorage.getItem('selectedDealer'));
        console.log(currentDealer)
        const postsData = await getPosts(currentDealer._id);
        setPosts(postsData);
    };

    const handleEdit = (post) => {
        setCurrentPost(post);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deletePost(dealer._id, id);
            addNotification('Post deleted successfully!', 'success');

            fetchPosts(dealer._id);
        } catch (error) {
            setError(`Failed to delete accessory: ${error.message}`);
        }
    };


    const handleSave = async (postData) => {
        if (currentPost) {
            await updatePost(dealer._id, currentPost._id, postData);
            addNotification('Post updated successfully!', 'success');
        } else {
            await createPost(dealer._id, postData);
            addNotification('Post created successfully!', 'success');
        }
        setModalOpen(false);
        fetchPosts(dealer._id);
    };

    if (error) return <p>Error: {error}</p>;

    const postConfig = {
        type: 'Post',
        fields: {
            title: { label: 'Title', type: 'text' },
            content: { label: 'Content', type: 'text' }
        }
    }

    return (
        <div className="p-4">
            <button onClick={() => setModalOpen(true)} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Post</button>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {posts.map(post => (
                    <PostCard key={post._id}
                        post={post}
                        onEdit={handleEdit}
                        onDelete={handleDelete} />
                ))}
            </div>
            {isModalOpen && (
                <FormModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                    entity={currentPost}
                    entityConfig={postConfig}
                />
            )}
        </div>
    );
}

export default PostsList;
