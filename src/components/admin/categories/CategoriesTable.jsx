import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { adminCategoriesColumnsDefinitions } from '../../helper/ColumnTableDefinitions';
import api from '../../../api';
import RightModal from '../RightModal';
import DeleteModal from '../DeleteModal.jsx';
import toast from 'react-hot-toast';
import EditCategoryForm from './EditCategoryForm.jsx';
import { set } from 'react-hook-form';





export default function AdminCategories() 
{
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [isRightModalOpen, setIsRightModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [updateRowStatus, setUpdateRowStatus] = useState("");
    const [rightModalTitle, setRightModalTitle] = useState("Update Category");

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: 5,
        rowCount: 0,
    });

    const fetchCategories = async ({pageSize ,  pageNumber }) => {
        setLoading(true);
        try {
            
            const response = await api.get(`/public/categories?pageSize=${pageSize}&pageNumber=${pageNumber + 1}`);

            setRows(response.data.categories);
            console.log("Categories response:", response);
            setPagination((prev) => ({
                ...prev,
                page: response.data.pageNumber - 1,
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
        fetchCategories({pageSize: pagination.pageSize, pageNumber: pagination.page});
    }, [updateRowStatus]);

   


    const handlePaginationModelChange = (paginationModel) => {
        console.log("Pagination model changed:", paginationModel);
        fetchCategories({pageSize: paginationModel.pageSize, pageNumber: paginationModel.page});
        
    }

    const handleOnEditClick = ({category}) => {
        setSelectedCategory(category);
        setRightModalTitle("Update Category");
        setIsRightModalOpen(true);
    }

   

    const handleOnAddCategoryClick = () => {
        //Make empty category object as when adding new category
        // after editing a category it gets it's data in selectedCategory state
        setSelectedCategory("");
        setRightModalTitle("Add Category");
        setIsRightModalOpen(true);
    }

    const handleOnDeleteClick = ({category}) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    }


    const onDeleteHandler = async () => {
        try {
           
            const response = await api.delete(`/admin/categories/${selectedCategory.id}`);
            
            setUpdateRowStatus("deleted" + selectedCategory.id);
            toast.success('Category deleted successfully!');
            
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Failed to delete category:' + error.response.data.message);
        }
    }


  return (<div className="w-xl mx-auto">
            <div className='flex flex-row justify-between items-center'>
                <div className="text-2xl font-semibold mb-4">Admin Categories</div>
                <button  className="bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                        onClick={() => {handleOnAddCategoryClick()}}
                                            title="Add category"
                                            >
                                                Add Category
                </button>
            </div>
    
            <div className='w-full'>
                <DataGrid className='w-full'
                    rows={rows}
                    columns={adminCategoriesColumnsDefinitions(
                        {
                         handleEdit: handleOnEditClick, 
                         handleDelete: handleOnDeleteClick,
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
                        content={<EditCategoryForm selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                setIsOpen={setIsRightModalOpen}
                                setUpdateRowStatus={setUpdateRowStatus}
                                />}
            />
            <DeleteModal 
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                onDeleteHandler={onDeleteHandler}
                title="Product"
                message="Are you sure you want to delete this product?"
            />

          
         </div>
  );
}
