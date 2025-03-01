import axios from 'axios'; // Axios for making HTTP requests
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"; // Toast notifications for user feedback
import "react-toastify/dist/ReactToastify.css";
import '../css/AddUser.css'; // Importing CSS for styling

function AddUser() {
    //  State to store form input data
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    //  State to manage form errors
    const [errors, setErrors] = useState({});

    //  Loading state for form submission
    const [isLoading, setIsLoading] = useState(false);

    //  Hook for navigation
    const navigate = useNavigate();

    //  Function to validate form fields
    const validateField = (name, value) => {
        // Regular expressions for validation
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        const nameRegex = /^[a-zA-Z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        let errorMsg = '';

        //  Check if the field is empty
        if (!value.trim()) {
            errorMsg = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
        } else {
            //  Switch case for specific field validation
            switch (name) {
                case 'username':
                    if (value.length < 3 || !usernameRegex.test(value)) {
                        errorMsg = "Username must contain only letters, numbers, or underscores.";
                    }
                    break;
                case 'firstName':
                    if (!nameRegex.test(value)) {
                        errorMsg = "First Name must contain only alphabets.";
                    }
                    break;
                case 'lastName':
                    if (!nameRegex.test(value)) {
                        errorMsg = "Last Name must contain only alphabets.";
                    }
                    break;
                case 'email':
                    if (!emailRegex.test(value)) {
                        errorMsg = "Invalid email format.";
                    }
                    break;
                case 'password':
                    if (!passwordRegex.test(value)) {
                        errorMsg = "Password must be at least 8 characters, include an uppercase, lowercase, number, and special character.";
                    }
                    break;
                default:
                    break;
            }
        }

        //  Show error message as a toast notification
        if (errorMsg) {
            toast.error(errorMsg, { autoClose: 3000 });
        }

        //  Update error state
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    };

    //  Function to handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        //  Clear error when user starts typing
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    //  Function to validate input fields on blur
    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    //  Function to check if the form is valid before submission
    const isFormValid = () => {
        return Object.values(errors).every((error) => error === '') &&
               Object.values(formData).every((value) => value.trim() !== '');
    };

    //  Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for empty fields before submitting
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            if (!formData[field].trim()) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
                toast.error(newErrors[field], { autoClose: 3000 });
            }
        });

        //  If there are errors, stop submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        //  If form validation fails, show error
        if (!isFormValid()) {
            toast.error("Please fix the errors before submitting!", { autoClose: 3000 });
            return;
        }

        setIsLoading(true); //  Set loading state

        try {
            //  First API call for authentication
            const firstResponse = await axios.post(
                'http://localhost:8000/api/auth/login',
                { username: 'admin', password: 'password' }
            );

            //  Retrieve authentication token
            const token = firstResponse.data.token;
            if (!token) {
                throw new Error('Authentication failed');
            }

            //  Second API call to add a new user
            await axios.post(
                'http://localhost:8000/users/add',
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            //  Show success notification
            toast.success("User added successfully!", { autoClose: 3000 });

            //  Reset form fields and errors after successful submission
            setFormData({ username: '', firstName: '', lastName: '', email: '', password: '' });
            setErrors({});
        } catch (error) {
            //  Handle API errors
            toast.error(error.response?.data?.message || 'Failed to add user', { autoClose: 3000 });
        } finally {
            setIsLoading(false); //  Reset loading state
        }
    };

    return (
        <div className="add-user-container">
            {/*  Page heading */}
            <h2>Add User</h2>

            {/*  User Registration Form */}
            <Form onSubmit={handleSubmit}>
                {/*  Loop through form fields dynamically */}
                {['username', 'firstName', 'lastName', 'email', 'password'].map((field) => (
                    <Form.Group key={field}>
                        {/*  Label for input field */}
                        <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>

                        {/*  Input field */}
                        <Form.Control
                            type={field === 'password' ? 'password' : 'text'}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={formData[field] ? 'expanded' : ''}
                        />
                    </Form.Group>
                ))}

                {/*  Submit Button */}
                <Button type="submit" disabled={isLoading} className="btn-add">
                    {isLoading ? 'Adding User...' : 'Add User'}
                </Button>
            </Form>

            {/*  Back to Home Button */}
            <Button variant="secondary" onClick={() => navigate('/')} className="btn-back mt-3">
                Back to Home
            </Button>
        </div>
    );
}

export default AddUser; //  Exporting the AddUser component
