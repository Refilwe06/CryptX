import React, { useContext, useEffect, useState } from 'react';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { UserContext } from '../../context/UserContext';

const Register = () => {
    const { register, loading, error } = useAuth();
    const { setUser, user } = useContext(UserContext);
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formErrors = {};

        if (!formData.name) {
            formErrors.name = 'Name is required';
        }

        if (!formData.username) {
            formErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            formErrors.username = 'Username must be at least 3 characters';
        } else if (/\s/.test(formData.username)) {
            formErrors.username = 'Username should not contain spaces.';
        }

        if (!formData.password) {
            formErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            formErrors.password = 'Password must be at least 6 characters';
        }

        return formErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            console.log('Form Submitted', formData);
            // if no errors, call the register endpoint
            const { name, username, password } = formData;
            register(name, username, password, setUser);
        }
    };

    useEffect(() => {
        // If the user is already logged in, redirect to the profile page
        if (user) {
            navigate('/overview');
        }
    }, [user, navigate]);

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <div className="server-response">
                {
                    error ? <small className='error'>{error}</small> : user ? <small className='success'>Registration successful.</small> : ''
                }
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="input-container">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                <div className="input-container">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="error-message">{errors.username}</p>}
                </div>

                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>

                <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Loading' : 'Register'}</button>
            </form>
            <div className='login-register'>
                <p>Already a user? Login <Link to={'/login'} className='link'>here</Link>. </p>
            </div>
        </div>
    );
};

export default Register;
