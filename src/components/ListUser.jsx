
import axios from 'axios'; 
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/ListUser.css'; 

function ListUser() {
    //  State to store user data
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    //  Function to fetch users from API
    const fetchUsers = async () => {
        setIsLoading(true); //  Show loading indicator
        setMessage('');

        try {
            //  First API call - Authenticate and Get Token
            const firstResponse = await axios.post(
                'http://localhost:8000/api/auth/login',
                { username: 'admin', password: 'password' } // Replace with actual credentials
            );

            //  Extract token from response
            const token = firstResponse.data.token;
            if (!token) {
                throw new Error('Authentication failed: Token Not Received!');
            }

            //  Second API call - Fetch Users based on search
            const secondResponse = await axios.post(
                'http://localhost:8000/users/search',
                { searchTerm: search },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token for authentication
                        'Content-Type': 'application/json',
                    },
                }
            );

            //  Set users data
            setUsers(secondResponse.data);
            setMessage('Users fetched successfully!');
        } catch (error) {
            console.error('Error:', error.response?.data);
            setMessage(error.response?.data?.message || 'Failed to fetch user data.');
        } finally {
            setIsLoading(false); //  Hide loading indicator
        }
    };

    //  Fetch users only when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    //  Filtering logic for user search
    const filteredUsers = users.filter(user => {
        const searchTerm = search.trim().toLowerCase();
        const fullName = `${user.firstName || ''} ${user.lastName || ''} ${user.username || ''} ${user.email || ''}`.toLowerCase();
        return (
            fullName.includes(searchTerm) ||
            user.email?.toLowerCase().includes(searchTerm) ||
            user.username?.toLowerCase().includes(searchTerm)
        );
    });

    return (
        <div className="list-user-container">
            {/*  Page heading */}
            <h2>User List</h2>

            {/* 🔎 Search Input Field */}
            <Form.Control
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-3"
            />

            {/*  Show loading spinner while fetching users */}
            {isLoading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <>
                    {/*  User List Table */}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(user => (
                                    <tr key={user.userId}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    {/*  Display success/error message */}
                    {message && (
                        <Alert variant={message.includes('success') ? 'success' : 'danger'} className="mt-3">
                            {message}
                        </Alert>
                    )}
                </>
            )}

            {/*  Back to Home Button */}
            <Button variant="secondary" onClick={() => navigate('/')} className="mt-3">
                Back to Home
            </Button>
        </div>
    );
}

export default ListUser; //  Exporting the ListUser component
