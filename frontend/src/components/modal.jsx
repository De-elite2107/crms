import React, { useEffect, useState } from 'react';
import { useToast } from './ToastContext';
import { useStoreActions } from 'easy-peasy';
import { Login, Register } from './api';

const AuthModal = ({login, isOpen, onClose}) => {
    const [isLogin, setIsLogin] = useState(login);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setName] = useState('');
    const setUser = useStoreActions((actions) => actions.setUser);

    useEffect(() => {
        setIsLogin(login);
    }, [login]);

    const notify = useToast();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = isLogin ? Login(username, password) : Register(username, email, password);    
        try {
            const response = await url
    
            // Handle success
            console.log(response); // The response data from the server
            notify(response.message, 'success');
            
            // Assuming the token is returned in the response data
            setUser(response.data); // Set user data if returned
            localStorage.setItem('token', response.token); // Save token to local storage
    
        } catch (error) {
            if (error.response) {
                const errors = error.response.data; // This is expected to be an object with arrays of messages
                let errorMessage = 'Registration failed:\n';
                
                // Collect all error messages into a single array
                const allMessages = [];
                for (const messages of Object.values(errors)) {
                    allMessages.push(...messages); // Spread operator to add all messages to the array
                }

                // Join all messages into a single string for display
                errorMessage += allMessages.join('\n');
                console.error('Error:', error.response ? errorMessage : error.message);
                notify(error.response ? errorMessage : "Server down", 'error');
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                notify('Registration failed: Server down', 'error');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error:', error.message);
                notify('Registration failed: An unexpected error occurred.', 'error');
            }
        }
    
        onClose(); // Close the modal after submission
    };
    
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className='flex justify-between text-2xl mb-3 bg-customBlue text-white p-2'>
                    <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                    <div onClick={onClose}>X</div>
                </div>
                <div className='p-3'>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className='mb-3'>
                                <label>
                                    Email: &emsp;
                                    <input
                                        className='rounded-md hover:border-blue-500 greyBg'
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                        )}
                        <div className='mb-3'>
                            <label>
                                Name:&emsp;
                                <input
                                    className='rounded-md hover:border-blue-500 greyBg'
                                    type="text"
                                    value={username}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div className='mb-3'>
                            <label>
                                Password:&emsp;
                                <input
                                    className='rounded-md hover:border-blue-500 greyBg'
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <button className='bg-customGreen w-full rounded-lg hover:bg-gray-800  hover:text-white transition duration-200' type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                    </form>
                    <button onClick={() => setIsLogin(!isLogin)} className='m-auto block hover:text-blue-500'>
                        Switch to {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;