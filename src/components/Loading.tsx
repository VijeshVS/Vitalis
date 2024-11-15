import React from "react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-teal-600 animate-pulse"></div>
                <div className="w-6 h-6 rounded-full bg-teal-700 animate-pulse delay-100"></div>
                <div className="w-6 h-6 rounded-full bg-teal-800 animate-pulse delay-200"></div>
            </div>
        </div>
    );
};

export default Loading;
