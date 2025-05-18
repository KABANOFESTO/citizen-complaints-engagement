'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Forgot() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
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

            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-black/40"></div>

            <div className="relative z-10 w-full max-w-2xl lg:ml-16 ml-8">
                <div className="backdrop-blur-sm bg-black/20 rounded-xl shadow-2xl border border-blue-500/20 overflow-hidden">
                    <div className="p-10 lg:p-12">
                        <div className="flex flex-col items-start mb-10">
                            <h2 className="text-4xl font-bold text-white mb-3">Forgot Password? <span>🤔</span></h2>
                            <p className="text-blue-100 text-lg">Enter your email to receive a password reset link.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <label htmlFor="email" className="block text-base font-medium text-blue-300 mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="yourname@gmail.com"
                                    className="appearance-none block w-full px-5 py-4 bg-black/30 text-white placeholder-gray-500 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                                />
                                <p className="text-sm text-gray-400 mt-2">This is a hint text to help user.</p>
                            </div>

                            <div className="flex justify-between items-center">
                                <Link href="/auth" className="text-sm text-gray-300 hover:text-white transition">
                                    Back To Login
                                </Link>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-5 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Sending...' : 'Reset'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
