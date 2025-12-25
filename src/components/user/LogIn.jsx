import { useForm } from 'react-hook-form';
import { useState } from 'react';
import InputField from '../../shared/InputField';
import { useNavigate } from 'react-router-dom';
import api from "../../api.js"
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../../store/slices/auth-slice.jsx';
import { useLocation } from 'react-router-dom';

export default function LogIn() {
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
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
            const response = await api.post("/auth/login",data);

            if (response.status == 200) {
                dispatch(setToken(response.data));
                console.log("Redirecting to:", from);
                navigate(from, { replace: true });
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (err) {
            console.log(err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Log In</h1>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                   <div className="flex flex-col gap-2">
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
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <a href="/register" className="text-indigo-600 hover:underline font-semibold">
                        Register 
                    </a>
                </p>
            </div>
        </div>
    );
}