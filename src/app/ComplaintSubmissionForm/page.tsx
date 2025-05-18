"use client";
import { useState, useEffect } from 'react';
import { Camera, MapPin, AlertTriangle, Check, ChevronRight, ArrowLeft, X } from 'lucide-react';

// Complaint categories
const categories = [
    { id: 'infrastructure', name: 'Infrastructure', icon: '🏗️', examples: 'Roads, Bridges, Public Buildings' },
    { id: 'utilities', name: 'Utilities', icon: '💡', examples: 'Water, Electricity, Internet' },
    { id: 'sanitation', name: 'Sanitation', icon: '🗑️', examples: 'Garbage Collection, Public Cleanliness' },
    { id: 'transport', name: 'Transportation', icon: '🚌', examples: 'Public Transit, Traffic' },
    { id: 'safety', name: 'Public Safety', icon: '🚨', examples: 'Crime, Hazards, Emergency Services' },
    { id: 'environment', name: 'Environment', icon: '🌳', examples: 'Parks, Pollution, Wildlife' },
    { id: 'other', name: 'Other', icon: '📝', examples: 'Any other civic issues' }
];

// Urgency levels
const urgencyLevels = [
    { id: 'low', name: 'Low', description: 'Non-time sensitive issues', color: 'bg-blue-500' },
    { id: 'medium', name: 'Medium', description: 'Needs attention within a week', color: 'bg-yellow-500' },
    { id: 'high', name: 'High', description: 'Requires prompt attention', color: 'bg-orange-500' },
    { id: 'critical', name: 'Critical', description: 'Immediate action required', color: 'bg-red-500' }
];

// AI keywords that might suggest urgency
const urgentKeywords = [
    'danger', 'hazard', 'unsafe', 'emergency', 'critical', 'immediate', 'urgent', 'serious',
    'accident', 'threat', 'life-threatening', 'flood', 'fire', 'collapse', 'injured', 'sick',
    'leaking', 'broken', 'exposed', 'damaged', 'dangerous', 'harmful'
];

export default function ComplaintSubmissionForm() {
    // Form steps
    const steps = ['Category', 'Details', 'Location', 'Media', 'Review'];

    // Form state
    const [currentStep, setCurrentStep] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [coordinates, setCoordinates] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState('');
    const [suggestedUrgency, setSuggestedUrgency] = useState('');
    const [detectedKeywords, setDetectedKeywords] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [ticketId, setTicketId] = useState('');

    // Detect urgency based on text input
    useEffect(() => {
        const combinedText = `${title} ${description}`.toLowerCase();

        const foundKeywords = urgentKeywords.filter(keyword =>
            combinedText.includes(keyword.toLowerCase())
        );

        setDetectedKeywords(foundKeywords);

        if (foundKeywords.length > 3) {
            setSuggestedUrgency('critical');
        } else if (foundKeywords.length > 1) {
            setSuggestedUrgency('high');
        } else if (foundKeywords.length > 0) {
            setSuggestedUrgency('medium');
        } else {
            setSuggestedUrgency('low');
        }
    }, [title, description]);

    // Handle file upload
    interface PhotoChangeEvent extends React.ChangeEvent<HTMLInputElement> { }

    const handlePhotoChange = (e: PhotoChangeEvent) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setPhotoPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle geolocation
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoordinates({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setLocation('Current location detected');
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }
    };

    // Submit form
    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Simulate API call with a delay
        setTimeout(() => {
            // Generate a random ticket ID
            const generatedTicketId = 'CMP-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            setTicketId(generatedTicketId);
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    // Next step
    const goToNextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Previous step
    const goToPrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Reset form
    const resetForm = () => {
        setCurrentStep(0);
        setTitle('');
        setDescription('');
        setCategory('');
        setLocation('');
        setCoordinates({ lat: null, lng: null });
        setPhoto(null);
        setPhotoPreview('');
        setSuggestedUrgency('');
        setDetectedKeywords([]);
        setSubmitted(false);
        setTicketId('');
    };

    // Check if current step is valid
    const isCurrentStepValid = () => {
        switch (currentStep) {
            case 0: // Category
                return category !== '';
            case 1: // Details
                return title.trim() !== '' && description.trim() !== '';
            case 2: // Location
                return location.trim() !== '';
            case 3: // Media
                return true; // Media is optional
            case 4: // Review
                return true; // Review step is always valid
            default:
                return false;
        }
    };

    // If submission is complete, show success screen
    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fadeIn">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Complaint Submitted!</h2>
                        <p className="text-gray-600 mb-6">
                            Your complaint has been received and is being processed.
                        </p>

                        <div className="bg-blue-50 w-full rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-600 mb-2">Ticket Reference Number:</p>
                            <p className="text-xl font-mono font-bold text-blue-700">{ticketId}</p>
                        </div>

                        <p className="text-sm text-gray-500 mb-4">
                            You can use this reference number to track the status of your complaint.
                        </p>

                        <div className="flex gap-4 w-full">
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Submit Another
                            </button>
                            <button
                                onClick={() => window.location.href = '/track'} // Replace with actual tracking page URL
                                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Track Status
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 text-white p-4 md:p-6">
                    <h1 className="text-xl md:text-2xl font-bold">Report an Issue</h1>
                    <p className="text-blue-100 text-sm md:text-base">
                        Help us improve your community by reporting problems
                    </p>
                </div>

                {/* Progress indicator */}
                <div className="px-4 pt-4">
                    <div className="flex items-center justify-between mb-2">
                        {steps.map((step, index) => (
                            <div key={step} className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${index < currentStep
                                        ? 'bg-green-500 text-white'
                                        : index === currentStep
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-500'
                                        }`}
                                >
                                    {index < currentStep ? (
                                        <Check className="h-4 w-4" />
                                    ) : (
                                        <span>{index + 1}</span>
                                    )}
                                </div>
                                <span className="text-xs mt-1 hidden md:block">{step}</span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Form content */}
                <div className="p-4 md:p-6">
                    {currentStep === 0 && (
                        <div className="animate-fadeIn">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">What type of issue are you reporting?</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        onClick={() => setCategory(cat.id)}
                                        className={`cursor-pointer rounded-lg border p-3 transition-all ${category === cat.id
                                            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                            : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                                            }`}
                                    >
                                        <div className="flex items-center mb-2">
                                            <span className="text-2xl mr-2">{cat.icon}</span>
                                            <h3 className="font-medium text-gray-800">{cat.name}</h3>
                                        </div>
                                        <p className="text-xs text-gray-500">{cat.examples}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="animate-fadeIn">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Describe the issue</h2>

                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Brief summary of the issue"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Please provide as much detail as possible"
                                    rows={5}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    required
                                />
                            </div>

                            {detectedKeywords.length > 0 && (
                                <div className={`p-3 rounded-lg flex items-start mb-4 ${suggestedUrgency === 'critical' ? 'bg-red-50 text-red-800' :
                                    suggestedUrgency === 'high' ? 'bg-orange-50 text-orange-800' :
                                        'bg-yellow-50 text-yellow-800'
                                    }`}>
                                    <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">
                                            {suggestedUrgency === 'critical' ? 'Critical issue detected' :
                                                suggestedUrgency === 'high' ? 'Urgent issue detected' :
                                                    'Potential concern detected'}
                                        </p>
                                        <p className="text-sm">
                                            We've detected terms suggesting this may be a {suggestedUrgency} priority issue.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="animate-fadeIn">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Where is this issue located?</h2>

                            <div className="mb-4">
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                    Location Description
                                </label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        id="location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Address or description of location"
                                        className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={getCurrentLocation}
                                        className="bg-blue-600 text-white px-3 rounded-r-lg hover:bg-blue-700 transition-colors"
                                        title="Use current location"
                                    >
                                        <MapPin className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-lg h-48 md:h-64 flex items-center justify-center">
                                {coordinates.lat && coordinates.lng ? (
                                    <div className="text-center">
                                        <MapPin className="h-8 w-8 mx-auto text-blue-600" />
                                        <p className="text-sm text-gray-600 mt-2">
                                            Location set: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center p-4">
                                        <MapPin className="h-8 w-8 mx-auto text-gray-400" />
                                        <p className="text-sm text-gray-500 mt-2">
                                            Set a location manually or use your current position
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="animate-fadeIn">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add photos (optional)</h2>

                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-3">
                                    Adding photos helps us understand and address the issue more effectively
                                </p>

                                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                                    {photoPreview ? (
                                        <div className="relative w-full">
                                            <img
                                                src={photoPreview}
                                                alt="Preview"
                                                className="mx-auto max-h-48 rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPhoto(null);
                                                    setPhotoPreview('');
                                                }}
                                                className="absolute top-1 right-1 bg-gray-800 bg-opacity-70 rounded-full p-1 text-white hover:bg-opacity-100 transition-all"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <Camera className="h-12 w-12 text-gray-400 mb-3" />
                                            <p className="text-gray-500 text-center mb-2">Drag and drop photos here or click to upload</p>
                                            <p className="text-xs text-gray-400 text-center">JPG, PNG or GIF • Max 10MB</p>
                                        </>
                                    )}

                                    <input
                                        type="file"
                                        id="photo"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className={`${photoPreview ? 'hidden' : 'absolute inset-0 w-full h-full opacity-0 cursor-pointer'}`}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="animate-fadeIn">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Review your submission</h2>

                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                                    <p className="text-gray-800">
                                        {categories.find(cat => cat.id === category)?.name || 'Not specified'}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between">
                                        <h3 className="text-sm font-medium text-gray-500">Issue Details</h3>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${suggestedUrgency === 'critical' ? 'bg-red-100 text-red-800' :
                                            suggestedUrgency === 'high' ? 'bg-orange-100 text-orange-800' :
                                                suggestedUrgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-blue-100 text-blue-800'
                                            }`}>
                                            {suggestedUrgency.charAt(0).toUpperCase() + suggestedUrgency.slice(1)} Priority
                                        </span>
                                    </div>
                                    <p className="font-medium text-gray-800 mt-1">{title}</p>
                                    <p className="text-gray-600 text-sm mt-2">{description}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                                    <p className="text-gray-800">{location}</p>
                                </div>

                                {photoPreview && (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">Attached Photo</h3>
                                        <img
                                            src={photoPreview}
                                            alt="Attached"
                                            className="max-h-32 rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer with navigation buttons */}
                <div className="px-4 py-4 bg-gray-50 flex justify-between">
                    {currentStep > 0 ? (
                        <button
                            type="button"
                            onClick={goToPrevStep}
                            className="flex items-center text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Back
                        </button>
                    ) : (
                        <div></div> // Empty div to maintain layout
                    )}

                    {currentStep < steps.length - 1 ? (
                        <button
                            type="button"
                            onClick={goToNextStep}
                            disabled={!isCurrentStepValid()}
                            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isCurrentStepValid()
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`flex items-center px-6 py-2 rounded-lg transition-colors ${isSubmitting
                                ? 'bg-gray-400 text-white'
                                : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                'Submit Complaint'
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}