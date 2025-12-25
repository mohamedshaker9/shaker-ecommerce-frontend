import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { adminProductsColumnsDefinitions } from '../../helper/ColumnTableDefinitions';
import api from '../../../api';
import RightModal from '../RightModal';
import OrderUpdateForm from '../orders/OrderUpdateForm.jsx';
import { FaEdit } from 'react-icons/fa';
import EditProductForm from './EditProductForm.jsx';
import { RxCross1 } from 'react-icons/rx';
import DeleteModal from '../DeleteModal.jsx';
import toast from 'react-hot-toast';
import { set } from 'react-hook-form';
import ImageUploadForm from './ImageUploadForm.jsx';
import AdminProductView from './AdminProductView.jsx';

export default function AdminProducts() 
{
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [isRightModalOpen, setIsRightModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isProductViewOpen, setIsProductViewOpen] = useState(false);
    
    const [updateRowStatus, setUpdateRowStatus] = useState("");
    const [rightModalTitle, setRightModalTitle] = useState("Update Product");
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: 5,
        rowCount: 0,
    });

    const fetchProducts = async ({pageSize , pageNumber}) => {
        setLoading(true);
        try {
           
            const response = await api.get(`/public/products?pageSize=${pageSize}&pageNumber=${pageNumber}`);
            console.log("Products response:", response.data.products);
            setRows(response.data.products);
            setPagination((prev) => ({
                ...prev,
                page: response.data.pageNumber,
                pageSize: response.data.pageSize,
                rowCount: response.data.total,
            }));
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts({pageSize: pagination.pageSize, pageNumber: pagination.page});
    }, [updateRowStatus]);

   


    const handlePaginationModelChange = (paginationModel) => {
        //TO Do pagination handling
        fetchProducts({pageSize: paginationModel.pageSize, pageNumber: paginationModel.page});
        
    }


    const handleOnImageUploadClick = ({product}) => {
        setSelectedProduct(product);
        setIsImageModalOpen(true);
    }

    const imageUploadHandler = () => {
        setIsImageModalOpen(false);
        setUpdateRowStatus("imageUploaded" + selectedProduct.id);
    }

    const handleOnEditClick = ({product}) => {
        setSelectedProduct(product);
        setRightModalTitle("Update Product");
        setIsRightModalOpen(true);
    }

   

    const handleOnAddProductClick = () => {
        //Make empty product object as when adding new product
        // after editing a product it gets it's data in selectedProduct state
        setSelectedProduct("");
        setRightModalTitle("Add Product");
        setIsRightModalOpen(true);
    }

    const handleOnDeleteClick = ({product}) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    }

    const handleOnViewClick = ({product}) => {
        setSelectedProduct(product);
        setIsProductViewOpen(true);
    }

    const onDeleteHandler = async () => {
        try {
            
            console.log("Deleting product with id:", selectedProduct);
            const response = await api.delete(`/admin/products/${selectedProduct.id}`);
            setUpdateRowStatus("deleted" + selectedProduct.id);
            setIsDeleteModalOpen(false);
            toast.success('Product deleted successfully!');
            
        } catch (error) {
            toast.error('Failed to delete product:' + error);
        }
    }


  return (<div>
            <div className='flex flex-row justify-between items-center'>
                <div className="text-2xl font-semibold mb-4">Admin Products</div>
                <button  className="bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                        onClick={() => {handleOnAddProductClick()}}
                                            title="Add product"
                                            >
                                                Add Product
                </button>
            </div>
    
            <div className='max-w-full overflow-hidden'>
                <DataGrid className='w-full'
                    rows={rows}
                    columns={adminProductsColumnsDefinitions(
                        {
                         handleEdit: handleOnEditClick, 
                         handleDelete: handleOnDeleteClick,
                         handleImageUpload: handleOnImageUploadClick,
                         handleView: handleOnViewClick
                        })}
                    paginationModel={pagination}
                    pageSizeOptions={[pagination.pageSize]}
                    rowCount={pagination.rowCount}
                    paginationMode="server"
                    onPaginationModelChange={handlePaginationModelChange}
                    loading={loading}
                    disableColumnResize
                    disableRowSelectionOnClick
                    getRowId={(row) => row.id}
                />
            </div>
            <RightModal isProductViewOpen={isRightModalOpen}
                        setIsProductViewOpen={setIsRightModalOpen}
                        modalTitle={rightModalTitle}
                        content={<EditProductForm selectedProduct={selectedProduct}
                                setSelectedProduct={setSelectedProduct}
                                setIsOpen={setIsRightModalOpen}
                                setUpdateRowStatus={setUpdateRowStatus}
                                />}
            />

            <RightModal isProductViewOpen={isImageModalOpen}
                        setIsProductViewOpen={setIsImageModalOpen}
                        modalTitle={"Product Images"}
                        content={<ImageUploadForm 
                            setIsImageModalOpen={setIsImageModalOpen}
                            selectedProduct={selectedProduct}
                            imageUploadHandler={imageUploadHandler}/>}
            />
            <DeleteModal 
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                onDeleteHandler={onDeleteHandler}
                title="Product"
                message="Are you sure you want to delete this product?"
            />

          
            <RightModal isProductViewOpen={isProductViewOpen}
                        setIsProductViewOpen={setIsProductViewOpen}
                        modalTitle={"Product Details"}
                        content={<AdminProductView 
                            product={selectedProduct} />}
            />
         </div>
  );
}
