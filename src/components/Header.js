import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDealer } from '../context/DealerContext';

function Header() {
    const { dealer, updateDealerContext } = useDealer();

    useEffect(() => {
        const storedDealer = localStorage.getItem('selectedDealer');
        if (storedDealer) {
            updateDealerContext(JSON.parse(storedDealer));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <header className="bg-blue-500 text-white p-4 text-lg flex justify-between items-center">
            <h1>My Application</h1>
            <h2>{dealer?.name}</h2>
            {dealer && (
                <div>
                    <nav>
                        <Link to="/" className="text-white px-2">Home</Link>
                        <Link to={`/dealers/${dealer._id}/vehicles`} className="text-white px-2">Vehicles</Link>
                        <Link to={`/dealers/${dealer._id}/accessories`} className="text-white px-2">Accessories</Link>
                        <Link to={`/dealers/${dealer._id}/posts`} className="text-white px-2">Posts</Link>
                        <Link to={`/dealers/${dealer._id}/leads`} className="text-white px-2">Leads</Link>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;
