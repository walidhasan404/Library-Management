const LoadingSpinner = ({ size = "medium", text = "Loading..." }) => {
    const sizeClasses = {
        small: "w-6 h-6",
        medium: "w-12 h-12",
        large: "w-16 h-16"
    };

    return (
        <div className="flex flex-col items-center justify-center py-8">
            <div className="relative">
                <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
            </div>
            {text && (
                <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">{text}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;
