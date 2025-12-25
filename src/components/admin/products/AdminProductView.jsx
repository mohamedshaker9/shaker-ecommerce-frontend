import React from 'react';

const AdminProductView= ({ product }) => {
    if (!product) {
        return <div className="p-4">No product selected</div>;
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            
            <div className="flex justify-center">
                <img
                    src={product.image || '/placeholder.png'}
                    alt={product.name}
                    className="w-full max-h-64 object-contain rounded-lg"
                />
            </div>

           
            <div className="space-y-3">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                </div>

                <div>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-500 text-sm">Price</p>
                        <p className="text-lg font-semibold text-gray-800">
                            ${product.price?.toFixed(2)}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Stock</p>
                        <p className="text-lg font-semibold text-gray-800">
                            {product.quantity || 0} units
                        </p>
                    </div>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Category</p>
                    <p className="text-gray-800">{product.category || 'N/A'}</p>
                </div>

                
            </div>
        </div>
    );
};

export default AdminProductView;