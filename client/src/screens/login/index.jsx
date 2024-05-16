import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [sucess, setSucess] = useState('');
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const resetPassword = () => {
        window.location.href = '/forgot';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        const response = await fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.status === 200) {
            setError(null);
            setSucess(data.message);
        } else {
            setError(data.message);
        }

    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <div className="w-full max-w-md mx-8 bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-4">Login</h3>
                <form onSubmit={handleSubmit}>
                    {
                        error && <div className="mb-4 text-white p-4 w-full rounded-md bg-red-300">{error}</div>
                    }
                    {
                        sucess && <div className="mb-4 text-white p-4 w-full rounded-md bg-green-300">{sucess}</div>
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
                    <button type="submit" className="w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-800">Login</button>
                    <button className="w-full text-slate-900 mt-2 text-white p-2 rounded-lg border-2 border-bg-indigo-500 hover:text-white hover:bg-indigo-800" onClick={resetPassword}>Forgot Password</button>
                    <div className="flex justify-between mt-4">
                        <p>Don't have an account?</p>
                        <a href="/register">
                            <p className="text-indigo-400 hover:text-indigo-600 cursor-pointer">Register</p>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
