import { FaEdit, FaEye, FaImage, FaPlus, FaTrash } from "react-icons/fa";
import RightModal from "../admin/RightModal";


export const adminOrderTableColumns = ({handleEdit}) => {
    
    return [
    { 
         field: 'id',
         headerName: 'Order Id',
         width: 90 ,
         sortable: false
        
        },
    {
        field: 'userEmail',
        headerName: 'Email',
        width: 150,

    },
    {
        field: 'fullName',
        headerName: 'Full name',
        width: 150,
     
    },
    {
        field: 'totalAmount',
        headerName: 'Total Amount',
        type: 'number',
        width: 110,
    },
    {
        field: 'status',    
        headerName: 'Status',
        sortable: false,
        width: 160
    },
     {
        field: 'orderDate',
        type: 'dateTime',
        headerName: 'Order Date',
        sortable: false,
        width: 180,
        valueGetter: (value) => value ? new Date(value) : null,
        
    },
{
        field: 'action',
        headerName: 'Action',
        sortable: false,
        width: 160,
        renderCell: (params) => (
                <div className="flex justify-center">
                        <button 
                        className="text-gray px-2 py-1 mt-2 rounded mr-2 hover:cursor-pointer"
                        onClick={() => {handleEdit({order: params.row})}}
                        >
                         
                                <FaEdit   size={20} />
                        </button>
                </div>
        
        ),
}
];

}


export const adminProductsColumnsDefinitions = ({handleEdit,  handleDelete, handleImageUpload, handleView}) => {
    
    return [
    { 
         field: 'id',
         headerName: 'Product Id',
         width: 90 ,
         sortable: false
        
        },
    {
        field: 'productName',
        headerName: 'Name',
        width: 150,

    },
    {
        field: 'description',
        headerName: 'Description',
        width: 180,
     
    },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 110,
    },
    {
        field: 'quantity',    
        headerName: 'Quantity',
        sortable: false,
        width: 160
    },
    {
        field: 'specialPrice',    
        headerName: 'Special Price',
        sortable: false,
        width: 160
    },
{
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        width: 240,
        renderCell: (params) => (
                <div className="flex gap-2 justify-center items-center pt-3">
                        <button key={`image-${params.row.id}`}
                            className="bg-green-500 hover:cursor-pointer hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
                            onClick={() => {handleImageUpload({product: params.row})}}
                            title="image"
                            >
                                <FaImage size={16} />
                        </button>
                         <button key={`edit-${params.row.id}`}
                            className="bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                            onClick={() => {handleEdit({product: params.row})}}
                            title="Edit"
                            >
                                <FaEdit size={16} />
                        </button>
                        
                         <button key={`delete-${params.row.id}`}
                            className="bg-red-500 hover:cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                            onClick={() => {handleDelete({product: params.row})}}
                            title="Delete"
                            >
                                <FaTrash size={16} />
                        </button>
                         <button key={`view-${params.row.id}`}
                            className="bg-gray-500 hover:cursor-pointer hover:bg-gray-600 text-white px-3 py-1 rounded transition-colors"
                            onClick={() => {handleView({product: params.row})}}
                            title="View"
                            >
                                <FaEye size={16} />
                        </button>
                </div>
        
        ),
}
];
}


export const adminCategoriesColumnsDefinitions = ({handleEdit,  handleDelete}) => {
    
        return [
        { 
            field: 'id',
            headerName: 'Id',
            width: 90 ,
            sortable: false
            
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,

        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 240,
            renderCell: (params) => (
                    <div className="flex gap-2 justify-center items-center pt-3">
                            <button key={`edit-${params.row.id}`}
                                className="bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                                onClick={() => {handleEdit({category: params.row})}}
                                title="Edit"
                                >
                                    <FaEdit size={16} />
                            </button>
                            
                            <button key={`delete-${params.row.id}`}
                                className="bg-red-500 hover:cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                                onClick={() => {handleDelete({category: params.row})}}
                                title="Delete"
                                >
                                    <FaTrash size={16} />
                            </button>
                            
                    </div>
            
            ),
        }
]

}
