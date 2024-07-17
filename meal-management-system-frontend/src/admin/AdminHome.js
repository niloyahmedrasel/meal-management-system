import React from 'react';
import CreateUser from './createUser/CreateUser';
import CreateCategoryAndItem from './category&Item/CreateCategoryAndItem';
import CreateMeal from './createMeal/CreateMeal';
import UserOrderTable from './getUserOrder/UserOrderTable';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const navigate = useNavigate()
    const buttonHandler = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        navigate('/')
    };
    return (
        <div>
        <button className='btn btn-error mt-5 mx-2 text-white ' onClick={buttonHandler}>logout</button>
            <h1 className='text-center text-3xl mt-5 text-green-700 font-semibold'>User management admin page</h1>
            <CreateUser></CreateUser>
            <CreateCategoryAndItem></CreateCategoryAndItem>
            <CreateMeal></CreateMeal>
            <UserOrderTable></UserOrderTable>
        </div>
    );
};

export default AdminHome;