
import { useForm } from 'react-hook-form';

import { useState } from 'react';
import InputField from '../../shared/InputField.jsx';
import { useNavigate } from 'react-router-dom';
import api from "../../api.js"
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../../store/slices/auth-slice.jsx';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fullName:'',
            email: '',
            username:'',
            password: '',
        },
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        try {
            const response = await api.post("/auth/signup", data);
            const result =  response.data;

            if (response.status == 201) {
                toast.success("Registered Successfully.");
                navigate('/login');
            } {
                console.log(result);
                setError(result.message || 'Registration failed');
            }
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div><Toaster
                            position="top-center"
                            reverseOrder={false}
                            />
                        </div>
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h1>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                   <div className="flex flex-col gap-2">
                     <InputField
                        id="fullName"
                        label="Full Name"
                        register={register}
                        type="text"
                        required={true}
                        errors={errors}
                        placeholder="Full Name"
                        minLength={8}
                    />

                    <InputField
                        id="username"
                        label="User Name"
                        register={register}
                        type="text"
                        required={true}
                        errors={errors}
                        placeholder="username"
                        minLength={6}
                    />

                    <InputField
                        id="email"
                        label="Email"
                        register={register}
                        type="email"
                        required={true}
                        errors={errors}
                        placeholder="Email address"
                    />

                    <InputField
                        id="password"
                        label="Password"
                        register={register}
                        type="password"
                        required={true}
                        minLength={6}
                        errors={errors}
                        placeholder="Password"
                    />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                        {loading ? 'Register...' : 'Register'}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{' '}
                    <a href="/Login" className="text-indigo-600 hover:underline font-semibold">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}