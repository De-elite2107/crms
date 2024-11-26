// src/ToastContext.js
import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a Toast context
const ToastContext = createContext();

// Create a provider component
export const ToastProvider = ({ children }) => {
    const notify = (message, type) => {
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            case 'info':
                toast.info(message);
                break;
            case 'warning':
                toast.warning(message);
                break;
            default:
                break;
        }
    };

    return (
        <ToastContext.Provider value={notify}>
            {children}
            <ToastContainer
                position='top-right'
                autoClose = {5000}
                hideProgressBar={false} 
                closeOnClick 
                draggable 
                pauseOnHover 
            />
        </ToastContext.Provider>
    );
};

// Custom hook to use the Toast context
export const useToast = () => {
    return useContext(ToastContext);
};