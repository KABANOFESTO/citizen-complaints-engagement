'use client';
import { useState } from 'react';
import { Eye, EyeOff, Home } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    interface LoginFormState {
        email: string;
        password: string;
        showPassword: boolean;
        isLoading: boolean;
    }

    interface HandleSubmitEvent extends React.FormEvent<HTMLButtonElement> { }

    const handleSubmit = (e: HandleSubmitEvent): void => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Login attempt with:', { email, password });
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center bg-cover bg-center"
            style={{
                backgroundImage: "url('/login.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>

            {/* Full-page digital security background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-black/40"></div>

            {/* Left corner form container - increased width and height */}
            <div className="relative z-10 w-full max-w-2xl lg:ml-16 ml-8">
                {/* Home icon above form */}
                <div className="mb-4" style={{ textAlign: 'center' }}>
                    <a href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                        <Home className="h-6 w-6 mr-2" />
                        <span className="text-lg font-medium">Back to Home</span>
                    </a>
                </div>

                <div className="backdrop-blur-sm bg-black/20 rounded-xl shadow-2xl border border-blue-500/20 overflow-hidden">
                    <div className="p-10 lg:p-12">
                        {/* Login Header - made more prominent */}
                        <div className="flex flex-col items-start mb-10">
                            <h2 className="text-5xl font-bold text-white mb-3">Welcome Back 👋</h2>
                            <p className="text-blue-100 text-lg">Sign in to access your dashboard</p>
                        </div>

                        {/* Login Form - increased spacing */}
                        <div className="space-y-8">
                            <div>
                                <label htmlFor="email" className="block text-base font-medium text-blue-300 mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2 relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="yourname@gmail.com"
                                        className="appearance-none block w-full px-5 py-4 bg-black/30 text-white placeholder-gray-500 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                                    />
                                </div>
                                <p className="text-sm text-gray-400 mt-2">This is a hint text to help user.</p>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="password" className="block text-base font-medium text-blue-300">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                </div>
                                <div className="mt-2 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="********"
                                        className="appearance-none block w-full px-5 py-4 bg-black/30 text-white placeholder-gray-500 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-300"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Eye className="h-6 w-6" aria-hidden="true" />
                                        )}
                                    </button>
                                </div>
                                <div className="flex justify-end mt-2">
                                    <Link href="/auth/forgotPassword" className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer">
                                        Forgot Password?
                                    </Link>
                                </div>

                            </div>

                            <div className="pt-4">
                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-5 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : null}
                                    {isLoading ? 'Signing in...' : 'Login'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}