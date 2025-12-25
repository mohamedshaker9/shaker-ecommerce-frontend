import React from 'react';

function StatCard({ title, value, icon }) {
    return (
        <div className=" bg-white rounded-lg shadow p-6">
            <div className="flex flex-row items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium">{title}</p>
                   
                </div>
                <div className="text-2xl">{icon}</div>
                 
            </div>
            
            <div><p className="text-2xl font-bold text-gray-900 mt-2">{value}</p></div>
        </div>
    );
}

export default StatCard;