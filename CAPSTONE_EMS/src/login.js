import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., validate user credentials)
        // For now, we are assuming the login is successful
        navigate('/dashboard'); // Redirect to the Dashboard component
    };

    return (
        <div className='login-page'>
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forget">
                        <label><input type="checkbox" /> Remember me</label>
                        <a href="#">Forget password?</a>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="#"> Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
