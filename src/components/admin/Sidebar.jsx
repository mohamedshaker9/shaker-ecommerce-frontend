import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt } from "react-icons/fa";




const Sidebar = ({ navigationElements }) => {
    const pathname = useLocation().pathname;

    return (
       
            <div className="flex w-60 flex-col h-screen overflow-y-auto gap-y-3 bg-blue-600 text-white">
                <div className="flex items-center shrink-0 justify-center h-16 border-b border-gray-700">
                    <FaTachometerAlt size="45" className="mr-2" />
                    <h1 className="text-2xl font-bold text-white-500">Admin Panel</h1>
                </div>
        
                <nav className="flex flex-col flex-1 px-2 py-4 space-y-2">
                    <ul role="list" className="space-y-3 mx-2">
                        {navigationElements.map((item) => {

                            
                            return (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className={`flex gap-x-3 font-bold text-xl rounded-md p-3 ${
                                            pathname === item.path
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                        }`}
                                    >
                                        {item.icon && <item.icon className="w-5 h-5" />}
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav> 
            
        </div>
    );
};

export default Sidebar;