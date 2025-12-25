import React from 'react';
import Sidebar from './Sidebar.jsx';
import { FaHome, FaBox, FaTags, FaShoppingCart, FaStore, FaCross, FaTachometerAlt } from "react-icons/fa";
import { useState } from 'react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Button } from '@mui/material';
import { RxCross1 } from 'react-icons/rx';
import { TransitionChild } from '@headlessui/react';
import { Outlet } from 'react-router-dom';


const sidebarNavigationElements = 
[
    {"name": "Dashboard", "path": "/admin/dashboard", "icon": FaHome, "current": true},
    {"name": "Products", "path": "/admin/products", "icon": FaBox, "current": false},
    {"name": "Categories", "path": "/admin/categories", "icon": FaTags, "current": false},
    {"name": "Orders", "path": "/admin/orders", "icon": FaShoppingCart, "current": false},
    {"name": "Sellers", "path": "/admin/sellers", "icon": FaStore, "current": false},
];



function AdminLayout() {

    let [isSidebarOpen, setSidebarOpen] = useState(true)

    return (

    <div className="flex flex-row ">
        <div>
                {/* This for large screen and hidden by defualt unless large screen */}
                <div className="hidden  inset-y-18 dashboard-layout z-50 md:flex">
                    <Sidebar navigationElements={sidebarNavigationElements} />
                </div>
                <Button className="md:hidden fixed top-4 left-4 z-60" onClick={() => setSidebarOpen(true)}>
                    <span className='sr-only'>Open sidebar</span>
                    <FaTachometerAlt className='md:hidden text-2xl text-blue-500'/>
                </Button>
                {/* This for small screen and hidden by defualt unless small screen */}
                <Dialog open={isSidebarOpen} onClose={() => setSidebarOpen(false)} 
                    className="relative z-60 md:hidden">
                <div className="fixed inset-0 flex w-screen h-screen ">
                
                    <DialogPanel  transition 
                    className="flex max-w-xs border bg-blue-500 transition duration-2000 ease-in-out data-enter:data-closed:-translate-x-full data-leave:data-closed:-translate-x-full">
                    <Sidebar navigationElements={sidebarNavigationElements} />
                    <Button onClick={() => setSidebarOpen(false)}>
                        <span className='sr-only'>Close</span>
                        <RxCross1 className='-m-2.5 text-white text-2xl'/>
                    </Button>
                    </DialogPanel>
                
                </div>
            </Dialog>
        </div>
        <main className='w-full overflow-auto'>
            <div className='p-6'>
                <Outlet />
            </div>
        </main>
        
    </div>
        
    );
}

export default AdminLayout;