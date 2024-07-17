import React, { useState, useEffect } from 'react';

const UserOrder = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('User is not found');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/user/getOrders/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('you have no order to show');
                }

                const data = await response.json();
                console.log(data);
                setOrders(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h2 className='text-center mt-5 text-blue-500 font-semibold text-3xl'>Your Meal Orders</h2>
            {error && <p className='text-center text-red-600 font-xl'>{error}</p>}
            <div>
                {orders.map((order) => (
                    <div className='border-4 mt-5 text-center' key={order.id}>
                        <h3 className='text-xl font-bold'>Order Day: {order.orderDay}</h3>
                        <p className = 'text-xl font-bold'>No Meal: {order.no_meal ? 'Yes' : 'no'}</p>
                        <h4 className = 'text-xl font-bold'>Items:</h4>
                        <ul className = 'text-xl font-bold'>
                            {order.Items.map((item) => (
                                <li key={item.id}>{item.item_name}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserOrder;
