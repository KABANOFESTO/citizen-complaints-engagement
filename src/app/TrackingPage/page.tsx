"use client";
import { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    MapPin,
    Clock,
    CheckCircle,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Bell,
    Calendar,
    MessageSquare,
    Users,
    RefreshCw,
    Eye
} from 'lucide-react';

const mockComplaints = [
    {
        id: 'CMP-8742',
        title: 'Broken Street Light',
        category: 'infrastructure',
        categoryName: 'Infrastructure',
        description: 'The street light on the corner of Main St. and Oak Ave. has been out for a week, creating a safety hazard at night.',
        location: '123 Main St, Cityville',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        dateSubmitted: '2025-05-12T14:30:00Z',
        status: 'in-progress',
        urgency: 'medium',
        updates: [
            {
                date: '2025-05-12T14:30:00Z',
                status: 'submitted',
                message: 'Complaint received and logged in the system.'
            },
            {
                date: '2025-05-13T09:15:00Z',
                status: 'assigned',
                message: 'Assigned to Department of Infrastructure - Electrical Division.'
            },
            {
                date: '2025-05-15T11:45:00Z',
                status: 'in-progress',
                message: 'Team dispatched to evaluate the street light issue. Expected repair date: May 20, 2025.'
            }
        ],
        assignedDepartment: 'Department of Infrastructure',
        assignedTeam: 'Electrical Division',
        estimatedCompletionDate: '2025-05-20T17:00:00Z',
        photoUrl: '/api/placeholder/400/300'
    },
    {
        id: 'CMP-9103',
        title: 'Pothole on Residential Street',
        category: 'infrastructure',
        categoryName: 'Infrastructure',
        description: "Large pothole (approximately 2 feet wide) on Elm Street between 4th and 5th Avenue. It's causing damage to vehicles.",
        location: '45 Elm Street, Cityville',
        coordinates: { lat: 40.7135, lng: -74.0048 },
        dateSubmitted: '2025-05-05T10:22:00Z',
        status: 'resolved',
        urgency: 'high',
        updates: [
            {
                date: '2025-05-05T10:22:00Z',
                status: 'submitted',
                message: 'Complaint received and logged in the system.'
            },
            {
                date: '2025-05-05T14:05:00Z',
                status: 'assigned',
                message: 'Assigned to Department of Infrastructure - Road Maintenance Division.'
            },
            {
                date: '2025-05-06T09:30:00Z',
                status: 'in-progress',
                message: 'Team dispatched to repair the pothole.'
            },
            {
                date: '2025-05-07T16:45:00Z',
                status: 'resolved',
                message: 'Pothole has been filled and repaired. Please submit a new complaint if you notice any issues with the repair.'
            }
        ],
        assignedDepartment: 'Department of Infrastructure',
        assignedTeam: 'Road Maintenance Division',
        estimatedCompletionDate: '2025-05-10T17:00:00Z',
        completionDate: '2025-05-07T16:45:00Z',
        photoUrl: '/api/placeholder/400/300'
    },
    {
        id: 'CMP-7651',
        title: 'Overflowing Trash Bin',
        category: 'sanitation',
        categoryName: 'Sanitation',
        description: "Public trash bin at Central Park entrance is overflowing and hasn't been emptied for several days. Creating unpleasant odor and attracting pests.",
        location: 'Central Park East Entrance, Cityville',
        coordinates: { lat: 40.7112, lng: -74.0050 },
        dateSubmitted: '2025-05-16T08:45:00Z',
        status: 'submitted',
        urgency: 'medium',
        updates: [
            {
                date: '2025-05-16T08:45:00Z',
                status: 'submitted',
                message: 'Complaint received and logged in the system.'
            }
        ],
        photoUrl: '/api/placeholder/400/300'
    },
    {
        id: 'CMP-5324',
        title: 'Water Main Break',
        category: 'utilities',
        categoryName: 'Utilities',
        description: 'Water flowing onto the street from what appears to be a broken water main. Water pressure in the neighborhood has decreased significantly.',
        location: '78 Pine Road, Cityville',
        coordinates: { lat: 40.7140, lng: -74.0070 },
        dateSubmitted: '2025-05-17T07:30:00Z',
        status: 'in-progress',
        urgency: 'critical',
        updates: [
            {
                date: '2025-05-17T07:30:00Z',
                status: 'submitted',
                message: 'Complaint received and logged in the system as critical priority.'
            },
            {
                date: '2025-05-17T07:35:00Z',
                status: 'assigned',
                message: 'Assigned to Department of Utilities - Water Division. Emergency response team notified.'
            },
            {
                date: '2025-05-17T08:15:00Z',
                status: 'in-progress',
                message: 'Emergency response team on site. Water shut-off in progress to allow for repairs.'
            }
        ],
        assignedDepartment: 'Department of Utilities',
        assignedTeam: 'Water Division - Emergency Response',
        estimatedCompletionDate: '2025-05-18T20:00:00Z',
        photoUrl: '/api/placeholder/400/300'
    }
];

// Status configuration
const statusConfig = {
    'submitted': {
        label: 'Submitted',
        color: 'bg-blue-500',
        textColor: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: Clock
    },
    'assigned': {
        label: 'Assigned',
        color: 'bg-purple-500',
        textColor: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        icon: Users
    },
    'in-progress': {
        label: 'In Progress',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: RefreshCw
    },
    'resolved': {
        label: 'Resolved',
        color: 'bg-green-500',
        textColor: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: CheckCircle
    },
    'closed': {
        label: 'Closed',
        color: 'bg-gray-500',
        textColor: 'text-gray-600',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        icon: CheckCircle
    }
};

// Urgency configuration
const urgencyConfig = {
    'low': {
        label: 'Low Priority',
        color: 'bg-blue-500'
    },
    'medium': {
        label: 'Medium Priority',
        color: 'bg-yellow-500'
    },
    'high': {
        label: 'High Priority',
        color: 'bg-orange-500'
    },
    'critical': {
        label: 'Critical Priority',
        color: 'bg-red-500'
    }
};

// Format date function
interface ComplaintUpdate {
    date: string;
    status: keyof typeof statusConfig;
    message: string;
}

interface Complaint {
    id: string;
    title: string;
    category: string;
    categoryName: string;
    description: string;
    location: string;
    coordinates: { lat: number; lng: number };
    dateSubmitted: string;
    status: keyof typeof statusConfig;
    urgency: keyof typeof urgencyConfig;
    updates: ComplaintUpdate[];
    assignedDepartment?: string;
    assignedTeam?: string;
    estimatedCompletionDate?: string;
    completionDate?: string;
    photoUrl?: string;
}

const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format time ago function
interface TimeAgo {
    (dateString: string): string;
}

const timeAgo: TimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'just now';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
        return formatDate(dateString);
    }
};

export default function ComplaintTrackingPage() {
    // State management
    const [complaints, setComplaints] = useState(mockComplaints);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedComplaint, setExpandedComplaint] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<'all' | keyof typeof statusConfig>('all');
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [showNotificationBanner, setShowNotificationBanner] = useState(true);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

    // Filter complaints based on search query and filter selection
    const filteredComplaints = complaints.filter(complaint => {
        // Search filter
        const matchesSearch = searchQuery === '' ||
            complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            complaint.description.toLowerCase().includes(searchQuery.toLowerCase());

        // Status filter
        const matchesFilter = selectedFilter === 'all' || complaint.status === selectedFilter;

        return matchesSearch && matchesFilter;
    });

    // Toggle expanded complaint
    interface ToggleExpand {
        (id: string): void;
    }

    const toggleExpand: ToggleExpand = (id) => {
        if (expandedComplaint === id) {
            setExpandedComplaint(null);
        } else {
            setExpandedComplaint(id);
        }
    };

    // Enable browser notifications
    const enableNotifications = async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                setNotificationsEnabled(true);
                setShowNotificationBanner(false);
                // You would typically register the device for push notifications here
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    };

    // Lookup complaint by ID
    const lookupComplaint = () => {
        // This would typically be an API call in a real application
        // For demo purposes, we're just simulating a lookup
        alert(`Looking up complaint ${searchQuery}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Notification permission banner */}
            {showNotificationBanner && (
                <div className="bg-blue-600 bg-opacity-10 p-4">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center">
                            <Bell className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="text-sm text-gray-700">
                                Enable notifications to receive updates about your complaints
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowNotificationBanner(false)}
                                className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                            >
                                Dismiss
                            </button>
                            <button
                                onClick={enableNotifications}
                                className="px-3 py-1 bg-blue-600 rounded-lg text-sm text-white hover:bg-blue-700"
                            >
                                Enable Notifications
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main content */}
            <main className="max-w-6xl mx-auto p-4 md:p-6">
                {/* Search and filters */}
                <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by ID, title, or keyword..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={lookupComplaint}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Lookup
                            </button>
                            <div className="relative">
                                <button
                                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filter
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Status filter tabs */}
                    <div className="flex overflow-x-auto gap-2 mt-4 pb-1">
                        <button
                            onClick={() => setSelectedFilter('all')}
                            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${selectedFilter === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            All Complaints
                        </button>
                        {Object.entries(statusConfig).map(([status, config]) => (
                            <button
                                key={status}
                                onClick={() => setSelectedFilter(status as typeof selectedFilter)}
                                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${selectedFilter === status
                                    ? `${config.bgColor} ${config.textColor}`
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {config.label}
                            </button>
                        ))}
                    </div>

                    {/* View mode toggle */}
                    <div className="mt-4 flex justify-end">
                        <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-4 py-1.5 text-sm ${viewMode === 'list'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                List View
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                className={`px-4 py-1.5 text-sm ${viewMode === 'map'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Map View
                            </button>
                        </div>
                    </div>
                </div>

                {/* Complaints list */}
                {viewMode === 'list' && (
                    <div className="space-y-4">
                        {filteredComplaints.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                                <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-800 mb-2">No complaints found</h3>
                                <p className="text-gray-600">
                                    {searchQuery ? 'Try adjusting your search terms or filters' : 'You haven\'t submitted any complaints yet'}
                                </p>
                            </div>
                        ) : (
                            filteredComplaints.map(complaint => (
                                <div
                                    key={complaint.id}
                                    className={`bg-white rounded-xl shadow-md overflow-hidden transition-all ${expandedComplaint === complaint.id ? 'ring-2 ring-blue-300' : ''
                                        }`}
                                >
                                    {/* Complaint header/summary */}
                                    <div
                                        onClick={() => toggleExpand(complaint.id)}
                                        className="flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between md:justify-start md:gap-3 mb-2">
                                                <span className="text-sm font-mono text-gray-500">{complaint.id}</span>
                                                <span
                                                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${(statusConfig as Record<string, typeof statusConfig[keyof typeof statusConfig]>)[complaint.status].bgColor} ${(statusConfig as Record<string, typeof statusConfig[keyof typeof statusConfig]>)[complaint.status].textColor}`}
                                                >
                                                    {(() => {
                                                        const Icon = statusConfig[complaint.status as keyof typeof statusConfig].icon;
                                                        return <Icon className="h-3 w-3 mr-1" />;
                                                    })()}
                                                    {statusConfig[complaint.status as keyof typeof statusConfig].label}
                                                </span>
                                            </div>
                                            <h3 className="font-medium text-gray-900">{complaint.title}</h3>
                                            <div className="flex items-center mt-1 text-sm text-gray-500">
                                                <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                                                <span className="truncate">{complaint.location}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 md:flex-col md:items-end mt-3 md:mt-0">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                                                <span>{timeAgo(complaint.dateSubmitted)}</span>
                                            </div>
                                            <div className="flex items-center">
                                                {expandedComplaint === complaint.id ? (
                                                    <ChevronUp className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded complaint details */}
                                    {expandedComplaint === complaint.id && (
                                        <div className="border-t border-gray-200 p-4 bg-gray-50 animate-fadeIn">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Left column */}
                                                <div className="flex-1">
                                                    <div className="mb-4">
                                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                                                        <p className="text-gray-800">{complaint.description}</p>
                                                    </div>

                                                    <div className="mb-6">
                                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                                                        <div className="rounded-lg bg-gray-200 h-32 md:h-48 flex items-center justify-center">
                                                            <div className="text-center">
                                                                <MapPin className="h-6 w-6 mx-auto text-gray-400" />
                                                                <p className="text-xs text-gray-500 mt-1">{complaint.location}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {complaint.photoUrl && (
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-500 mb-1">Attached Photo</h4>
                                                            <img
                                                                src={complaint.photoUrl}
                                                                alt="Complaint"
                                                                className="w-full rounded-lg"
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Right column */}
                                                <div className="flex-1">
                                                    <div className="mb-4">
                                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Status Updates</h4>
                                                        <div className="space-y-3">
                                                            {complaint.updates.map((update, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`p-3 border rounded-lg ${statusConfig[update.status as keyof typeof statusConfig].borderColor} ${statusConfig[update.status as keyof typeof statusConfig].bgColor}`}
                                                                >
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        {(() => {
                                                                            const Icon = statusConfig[update.status as keyof typeof statusConfig].icon;
                                                                            return <Icon className={`h-4 w-4 ${statusConfig[update.status as keyof typeof statusConfig].textColor}`} />;
                                                                        })()}
                                                                        <span className={`text-sm font-medium ${statusConfig[update.status as keyof typeof statusConfig].textColor}`}>
                                                                            {statusConfig[update.status as keyof typeof statusConfig].label}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-sm text-gray-700">{update.message}</p>
                                                                    <p className="text-xs text-gray-500 mt-1">{formatDate(update.date)}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {complaint.assignedDepartment && (
                                                        <div className="mb-4">
                                                            <h4 className="text-sm font-medium text-gray-500 mb-1">Assigned to</h4>
                                                            <p className="text-gray-800">{complaint.assignedDepartment} - {complaint.assignedTeam}</p>
                                                        </div>
                                                    )}

                                                    {complaint.estimatedCompletionDate && complaint.status !== 'resolved' && (
                                                        <div className="mb-4">
                                                            <h4 className="text-sm font-medium text-gray-500 mb-1">Estimated Completion</h4>
                                                            <p className="text-gray-800">{formatDate(complaint.estimatedCompletionDate)}</p>
                                                        </div>
                                                    )}

                                                    {complaint.completionDate && (
                                                        <div className="mb-4">
                                                            <h4 className="text-sm font-medium text-gray-500 mb-1">Resolved on</h4>
                                                            <p className="text-gray-800">{formatDate(complaint.completionDate)}</p>
                                                        </div>
                                                    )}

                                                    {/* Action buttons */}
                                                    <div className="mt-6 flex flex-wrap gap-2">
                                                        <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                            <MessageSquare className="h-4 w-4 mr-2" />
                                                            Add Comment
                                                        </button>
                                                        <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Full Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Map view */}
                {viewMode === 'map' && (
                    <div className="bg-white rounded-xl shadow-md p-4">
                        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                            <div className="text-center p-8">
                                <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-800 mb-2">Map View</h3>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    This would display an interactive map showing the locations of all complaints.
                                    Each marker would be color-coded based on status and could be clicked to show details.
                                </p>
                            </div>
                        </div>

                        {/* Map legend */}
                        <div className="mt-4 flex flex-wrap gap-4">
                            {Object.entries(statusConfig).map(([status, config]) => (
                                <div key={status} className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full ${config.color} mr-2`}></div>
                                    <span className="text-sm text-gray-600">{config.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}