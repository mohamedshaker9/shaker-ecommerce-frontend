import React from 'react';
import StatCard from './StatCard.jsx';
import { FaShoppingCart, FaDollarSign, FaUsers, FaBoxOpen, FaTags } from 'react-icons/fa';
import api from '../../../api.js';


function AdminDashboard() {


    const [stats, setStats] = React.useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalUsers: 0,
        totalProducts: 0,
        totalCategories: 0
    });

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('userToken')).token;
                const response = await api.get('/admin/stats', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                setStats(response.data);
                console.log('Fetched stats:', response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);


    return (
    <div className="min-h-screen bg-blue-50 p-8">
        <div className="w-full mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatCard 
                    title="Total Orders" 
                    value={stats.totalOrders} 
                    icon={<FaShoppingCart />}
                    color="bg-blue-500"
                />
                <StatCard 
                    title="Total Revenue" 
                    value={`$${stats.totalRevenue.toLocaleString()}`} 
                    icon={<FaDollarSign />}
                    color="bg-green-500"
                />
                <StatCard 
                    title="Total Users" 
                    value={stats.totalUsers} 
                    icon={<FaUsers />}
                    color="bg-purple-500"
                />
                <StatCard 
                    title="Total Products" 
                    value={stats.totalProducts} 
                    icon={<FaBoxOpen />}
                    color="bg-orange-500"
                />
                <StatCard 
                    title="Categories" 
                    value={stats.totalCategories} 
                    icon={<FaTags />}
                    color="bg-pink-500"
                />
            </div>
        </div>
    </div>
    );
}   




export default AdminDashboard;
   

