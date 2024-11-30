// api.js
import axios from 'axios';

//Login Function
export const Login = async (username, password) => {
    // Define the API endpoint
    const API_URL = `${process.env.REACT_APP_API_URL}/login/`; // Update with your actual API URL
    const body ={ username, password }
    try {
        const response = await axios.post(API_URL, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching Resources:', error);
        throw error; // Rethrow the error for further handling if needed
    }
};

//Register Function
export const Register = async (username, email, password) => {
    // Define the API endpoint
    const API_URL = `${process.env.REACT_APP_API_URL}/register/`; // Update with your actual API URL
    const body ={username, email, password }
    try {
        const response = await axios.post(API_URL, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching Resources:', error);
        throw error; // Rethrow the error for further handling if needed
    }
};
 
// Function to fetch all courses
export const fetchCourses = async () => {
    // Define the API endpoint
    const API_URL = `${process.env.REACT_APP_API_URL}/courses/`; // Update with your actual API URL
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error; // Rethrow the error for further handling if needed
    }
};

// Function to fetch course resources
export const fetchResource = async (courseId) => {
    // Define the API endpoint
    const API_URL = `${process.env.REACT_APP_API_URL}/courses/${courseId}/resources/`; // Update with your actual API URL
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching Resources:', error);
        throw error; // Rethrow the error for further handling if needed
    }
};

export const fetchAssignments = async () => {
    const API_URL = `${process.env.REACT_APP_API_URL}/assignments/`; // Update with your actual API URL
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}

export const submitAssignment = async (assignment_id, response_text) => {
    // Define the API endpoint
    const token = localStorage.getItem('token')
    const API_URL = `${process.env.REACT_APP_API_URL}/assignments/${assignment_id}/responses/`; // Update with your actual API URL
    const body = {response_text}
    try {
        const response = await axios.post(API_URL, body, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}