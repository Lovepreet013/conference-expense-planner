import { useState } from 'react';

const TotalCost = ({ totalCosts, ItemsDisplay }) => {
    const [showBreakdown, setShowBreakdown] = useState(false);
    const total_amount = totalCosts.venue + totalCosts.addOn + totalCosts.meals;

    const handleToggleBreakdown = () => {
        setShowBreakdown(!showBreakdown);
    };

    return (
        <div className="p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <h3 className="text-2xl font-bold text-gray-800">Total cost for the event:</h3>
                    <h2 className="text-4xl font-extrabold text-blue-600">${total_amount}</h2>
                </div>
                <button
                    className="px-6 py-2 bg-blue-500 text-white rounded-full font-bold shadow-md hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                    onClick={handleToggleBreakdown}
                >
                    {showBreakdown ? 'Hide Breakdown' : 'View Breakdown'}
                </button>
            </div>
            
            {showBreakdown && (
                <div className="mt-4">
                    <ItemsDisplay />
                </div>
            )}
        </div>
    );
};

export default TotalCost;