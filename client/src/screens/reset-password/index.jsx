import React, { useState } from 'react';
import { useParams } from 'react-router';

const ResetPassword = () => {

    const [formData, setFormData] = useState({
        password: '',
        cpassword: ''
    });
    const { token } = useParams();

    const [passwordStatus, setPasswordStatus] = useState(false);
    const [error, setError] = useState('');
    const sendToLogin = () => {
        window.location.href = '/login';
    }


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, cpassword } = formData;

        if (formData.password !== formData.cpassword) {
            setError('Passwords do not match');
            return;
        }
        const response = await fetch('http://localhost:5000/user/reset-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ password })
        });

        const data = await response.json();
        if (response.status === 200) {
            setPasswordStatus(true);
        }
        else {
            setError(data.message);
        }
    }



    const sucessScreen = () => {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
                <div className="w-full max-w-md mx-8 bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-3xl font-bold text-center mb-4 text-gray-800">Hooray!!</h3>
                    <img src="/image/mail.png" alt="Reset Email" className="mx-auto mb-8 w-1/2 h-1/2" />
                    <p className="text-lg text-center text-gray-700">We have changed your password to your new desired password</p>
                    <button className="w-full bg-indigo-500 text-white py-2 mt-8 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200" onClick={sendToLogin}>Back to Login</button>
                </div>
            </div>
        )
    }

    const passwordForm = () => {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-200">
                <div className="w-full max-w-md mx-8 bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-center mb-4">Forget Password</h3>
                    <form onSubmit={handleSubmit}>
                        {
                            error && <div className="mb-4 text-white p-4 w-full rounded-md bg-red-300">{error}</div>
                        }
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="cpassword"
                                id="cpassword"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-800">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        passwordStatus ? sucessScreen() : passwordForm()
    );
};

export default ResetPassword;
