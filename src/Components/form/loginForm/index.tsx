import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock } from 'lucide-react';
import { signIn } from '../../../features/authSlice';
import type { RootState } from '../../../store/store';
import Loader from '../../LoadingSpinner';
import { useNavigate } from 'react-router-dom';

type LoginFormInputs = {
    email: string;
    password: string;
};

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const auth = useSelector((state: RootState) => state.auth);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const onSubmit = (data: LoginFormInputs) => {
        dispatch(signIn(data));
    };

    useEffect(() => {
        if (auth.token) {
            navigate('/userList')
        }
    }, [auth.token, navigate])

    return (
        <>
            {auth?.loading ? <Loader /> : null}
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
                >
                    <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

                    {auth.error && (
                        <div className="mb-4 text-red-500 text-sm text-center">{auth.error}</div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <div className={`flex items-center border rounded-xl px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}>
                            <Mail className="w-5 h-5 text-gray-400 mr-2" />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full outline-none bg-transparent"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <div className={`flex items-center border rounded-xl px-3 py-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}>
                            <Lock className="w-5 h-5 text-gray-400 mr-2" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full outline-none bg-transparent"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={auth?.loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition duration-200"
                    >
                        {auth?.loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginForm;
