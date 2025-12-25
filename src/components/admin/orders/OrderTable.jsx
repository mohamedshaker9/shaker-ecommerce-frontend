import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, use } from 'react';
import api from '../../../api';
import { adminOrderTableColumns } from '../../helper/ColumnTableDefinitions';
import RightModal from '../RightModal';
import OrderUpdateForm from './OrderUpdateForm.jsx';


export default function OrderTable() 
{
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isRightModalOpen, setIsRightModalOpen] = useState(false);
    const [updateRowStatus, setUpdateRowStatus] = useState("");

    const handlePaginationModelChange = (newModel) => {
        //TO Do pagination handling
    }

    const handleOnEditClick = ({order}) => {
        setSelectedOrder(order);
        setIsRightModalOpen(true);
    }


    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: 5,
        rowCount: 0,
    });


    const fetchOrders = async () => {
        setLoading(true);
        try {
           
            const response = await api.get('/orders');
            setRows(response.data.content);
            setPagination((prev) => ({
                ...prev,
                page: response.data.pageNumber,
                pageSize: response.data.pageSize,
                rowCount: response.data.pageSize,
            }));
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            fetchOrders();
    }, [updateRowStatus]);


  return (<>
    <Box sx={{ height: "99%", width: '99%' }}>
      <DataGrid
        rows={rows}
        columns={adminOrderTableColumns({handleEdit: handleOnEditClick})}
        paginationModel={pagination}
        pageSizeOptions={[pagination.pageSize]}
        rowCount={pagination.rowCount}
        paginationMode="server"
        onPaginationModelChange={handlePaginationModelChange}
        loading={loading}
        disableColumnResize
        disableRowSelectionOnClick
        
      />
    </Box>
    <RightModal isProductViewOpen={isRightModalOpen}
                setIsProductViewOpen={setIsRightModalOpen}
                modalTitle="Product Update"
                content={<OrderUpdateForm 
                    selectedOrder={selectedOrder} 
                    setSelectedOrder={setSelectedOrder}
                    setUpdateRowStatus={setUpdateRowStatus} />
                } />

    </>
  );
}
