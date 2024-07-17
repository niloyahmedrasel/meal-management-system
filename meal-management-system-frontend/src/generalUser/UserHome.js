import React from 'react';
import MealOrderPage from './mealOrderPage/MealOrderPage'
import UserOrder from './userOrder/UserOrder';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
    const navigate = useNavigate()
    const buttonHandler = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        navigate('/')
    };
    return (
        <div>
            <button className='btn btn-error mt-5 mx-2 text-white ' onClick={buttonHandler}>logout</button>
            <h1 className='mb-10 mt-5 text-4xl text-green-500 text-center'>General User Home Page</h1>
            <MealOrderPage></MealOrderPage>
            <UserOrder></UserOrder>
        </div>
    );
};

export default UserHome;