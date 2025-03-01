import React from 'react';
import { ToastContainer } from "react-toastify";
import { Route, Routes } from 'react-router-dom';
import AddUser from './components/AddUser';
import Home from './components/Home';
import ListUser from './components/ListUser';
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AddUser" element={<AddUser />} />
                <Route path="/ListUser" element={<ListUser />} />
            </Routes>
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
}

export default App;
