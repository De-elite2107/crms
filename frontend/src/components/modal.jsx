import React, { useState } from 'react';
import { useToast } from './ToastContext';
import { useStoreActions } from 'easy-peasy';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setName] = useState('');
    const setUser = useStoreActions((actions) => actions.setUser);

    const notify = useToast();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = isLogin ? `${process.env.REACT_APP_API_URL}/login/` : 'http://localhost:8000/api/register/';
        const body = isLogin ? { username, password } : { username, email, password };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                const result = await response.json();
                console.log(result); // Handle success (e.g., show a message or redirect)
                notify(result.message,'success');
                setUser(result.user);
                localStorage.setItem('token', result.token);
                
            } else {
                console.error('Error:', response.statusText);
                notify(response.statusText,'error');
            }
        } catch (error) {
            console.error('Error:', error);
            notify(error,'error');
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