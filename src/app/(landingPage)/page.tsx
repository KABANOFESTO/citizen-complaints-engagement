"use client";
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
    FileText,
    Send,
    Search,
    Clock,
    CheckCircle,
    Share2,
    Shield,
    Code,
    ChevronRight,
    User
} from 'lucide-react';

export default function Home() {
    const [activeImage, setActiveImage] = useState(0);
    const demoImages = [
        { name: "Complaint Form", alt: "User submitting a complaint through the form" },
        { name: "Status Tracking", alt: "User tracking the status of their complaint" },
        { name: "Admin Dashboard", alt: "Government official viewing the admin dashboard" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Head>
                <title>PublicVoice - Citizen Feedback Platform</title>
                <meta name="description" content="Submit and track feedback or complaints to your local government" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="bg-white shadow-sm">
                <div className="container mx-auto py-4 px-6 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-md"></div>
                        <span className="font-bold text-xl text-blue-700">PublicVoice</span>
                    </div>
                    <button className="text-sm px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition flex items-center">
                        <User size={16} className="mr-1" />
                        Admin Login
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-blue-800 leading-tight">
                                Empowering Citizens. Improving Public Services.
                            </h1>
                            <p className="text-xl text-gray-600">
                                Easily submit feedback or complaints and track responses from your local government.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/ComplaintSubmissionForm">
                                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md flex items-center">
                                    Submit a Complaint
                                    <ChevronRight size={20} className="ml-1" />
                                </button>
                            </Link>
                            <Link href="/TrackingPage">
                                <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition border border-blue-200 flex items-center">
                                    Track Your Case
                                    <Search size={18} className="ml-1" />
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="relative w-full h-80">
                            <div className="absolute inset-0 bg-blue-600 rounded-lg opacity-10"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-3/4 h-3/4">
                                    <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 transform rotate-3">
                                        {/* Placeholder for dashboard image */}
                                        <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                                            <span className="text-gray-400">Dashboard Preview</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <FileText size={28} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Submit complaint or feedback</h3>
                            <p className="text-gray-600">Fill out our simple form with details about your issue or suggestion.</p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <Send size={28} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">We route it to the right agency</h3>
                            <p className="text-gray-600">Our system automatically directs your submission to the correct department.</p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <Search size={28} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Track your case & get a response</h3>
                            <p className="text-gray-600">Follow progress in real-time and receive updates until resolution.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Key Features</h2>
                    <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">Designed to streamline communication between citizens and government agencies</p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                <FileText size={24} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Complaint Submission</h3>
                            <p className="text-gray-600">Submit issues via web or mobile with our user-friendly interface.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <Share2 size={24} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Auto Categorization & Routing</h3>
                            <p className="text-gray-600">AI-powered system that routes issues to the appropriate department.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                                <Clock size={24} className="text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Ticket Status Tracking</h3>
                            <p className="text-gray-600">Real-time updates on the progress of your submitted complaints.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                                <CheckCircle size={24} className="text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Admin Response Panel</h3>
                            <p className="text-gray-600">Efficient interface for government officials to manage and resolve issues.</p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                                <Shield size={24} className="text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Scalable & Secure</h3>
                            <p className="text-gray-600">Built with enterprise-grade security and capable of handling high traffic.</p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                                <Code size={24} className="text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Extensible via APIs</h3>
                            <p className="text-gray-600">Integrate with existing systems through our comprehensive API.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why This Matters */}
            <section className="py-16 bg-blue-700 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Why This Matters</h2>
                            <p className="text-xl mb-6 text-blue-100">
                                No more delays or uncertainty. Our platform streamlines communication between citizens and government to ensure faster responses and better accountability.
                            </p>
                            <div className="bg-white text-gray-800 p-6 rounded-lg">
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-2 rounded">
                                        <CheckCircle size={24} className="text-green-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-lg">Streetlight fixed in 3 days!</h4>
                                        <p className="text-gray-600 mt-1">
                                            "I reported a broken streetlight and it was fixed within 3 days. Previously, this would have taken weeks!"
                                        </p>
                                        <p className="text-gray-500 mt-2 text-sm">- Sarah K., Citizen</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-blue-600 p-6 rounded-lg">
                                <h3 className="font-bold text-xl mb-2">For Citizens</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <CheckCircle size={16} className="mr-2" />
                                        <span>Quick, streamlined complaint submission</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={16} className="mr-2" />
                                        <span>Transparent tracking of issue status</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={16} className="mr-2" />
                                        <span>Improved communication with local authorities</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-blue-600 p-6 rounded-lg">
                                <h3 className="font-bold text-xl mb-2">For Government</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <CheckCircle size={16} className="mr-2" />
                                        <span>Better organization of public requests</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={16} className="mr-2" />
                                        <span>Data-driven insights on community needs</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={16} className="mr-2" />
                                        <span>Increased public trust through accountability</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Preview */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Platform Preview</h2>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Demo Image */}
                        <div className="bg-gray-100 rounded-lg shadow-md aspect-video flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
                                <div className="text-white text-center px-6">
                                    <div className="inline-block px-4 py-2 border-2 border-white rounded-full mb-4">Coming Soon</div>
                                    <h3 className="text-2xl font-bold">{demoImages[activeImage].name}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Dots */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {demoImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`w-3 h-3 rounded-full ${activeImage === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                                    aria-label={`View ${image.name}`}
                                ></button>
                            ))}
                        </div>

                        {/* Image Descriptions */}
                        <div className="flex justify-center mt-4">
                            <div className="text-center px-4 py-2 rounded-md bg-blue-50 text-blue-700">
                                {demoImages[activeImage].name}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-blue-800 mb-6">Ready to make your voice heard?</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md">
                            Submit a Complaint
                        </button>
                        <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition border border-blue-200">
                            Track Your Complaint
                        </button>
                        <button className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition">
                            Sign in as Government Official
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300 py-10">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-md"></div>
                                <span className="font-bold text-xl text-white">PublicVoice</span>
                            </div>
                            <p className="text-gray-400">
                                Bridging the gap between citizens and government services.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">About</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition">About the Project</a></li>
                                <li><a href="#" className="hover:text-white transition">Our Team</a></li>
                                <li><a href="#" className="hover:text-white transition">Partners</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                                <li><a href="#" className="hover:text-white transition">Contact Support</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400">© 2025 PublicVoice. All rights reserved.</p>
                        <p className="text-gray-400 mt-2 md:mt-0">
                            Part of the Digital Government Initiative
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}