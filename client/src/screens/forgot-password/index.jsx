import React, { useState } from 'react';

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const [emailStatus, setEmailStatus] = useState(false);
    const [error, setError] = useState('');
    const sendToLogin = () => {
        window.location.href = '/login';
    }


    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/user/reset-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (response.status === 200) {
            setEmailStatus(true);
        }
        else {
            setError(data.message);
        }
    }



    const emailSent = () => {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
                <div className="w-full max-w-md mx-8 bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-3xl font-bold text-center mb-4 text-gray-800">Reset Link Sent on Email</h3>
                    <img src="/image/mail.png" alt="Reset Email" className="mx-auto mb-8 w-1/2 h-1/2" />
                    <p className="text-lg text-center text-gray-700">We've sent a reset link to your email address. Please check your inbox and follow the instructions to reset your password.</p>
                    <button className="w-full bg-indigo-500 text-white py-2 mt-8 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200" onClick={sendToLogin}>Back to Login</button>
                </div>
            </div>
        )
    }

    const emailForm = () => {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-200">
                <div className="w-full max-w-md mx-8 bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-center mb-4">Forget Password</h3>
                    <form onSubmit={handleSubmit}>
                        {
                            error && <div className="mb-4 text-white p-4 w-full rounded-md bg-red-300">{error}</div>
                        }
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-800">Submit</button>
                        <div className="flex justify-between mt-4">
                            <p>Already have an account?</p>
                            <a href="/login">
                                <p className="text-indigo-400 hover:text-indigo-600 cursor-pointer">Login</p>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        emailStatus ? emailSent() : emailForm()
    );
};

export default ForgetPassword;
