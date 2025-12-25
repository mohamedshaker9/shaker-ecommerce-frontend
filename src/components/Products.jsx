import React, { use, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import  { useSelector, useDispatch } from 'react-redux';
import { fetchProductsSuccess } from '../store/slices/products-slice.jsx';
import { fetchCategories, fetchProducts } from '../index.js';
import toast, { Toaster } from 'react-hot-toast';
import ProdcutSearchInput from './ProductsFilter.jsx';
import ProductsFilter from './ProductsFilter.jsx';
import { useProductsFilter } from './useProductsFilter.jsx';
import { Grid } from 'react-loader-spinner';
import Paginations from './Paginations.jsx';
import { useSearchParams } from 'react-router-dom'; 

function Products() {

    const isProductLoading = useSelector((state) => state.products.isLoading);
    const isProductError = useSelector((state) => state.products.error);
    const {products, pagination}  = useSelector((state) => state.products);
    

    const categoriesList = useSelector((state) => state.categories.categories);
    
    const dispatch = useDispatch();


    useProductsFilter();

    useEffect(() => {
        dispatch(fetchCategories() );
    }, [dispatch] );


    const [searchParam, setSearchParam] = useSearchParams();
    const params = new URLSearchParams(searchParam);
    const currentPage = Number(params.get("pageNumber")) + 1;

    const handlePageChange = (event, value) => {
        const params = new URLSearchParams(searchParam); 
        if(value === 1){
            params.delete("pageNumber");
        } else {
            params.set("pageNumber", Number(value) - 1);
            console.log("Page changed to:", value);
        }
        setSearchParam(params);
        fetchProducts(params.toString());
    }

    return (
            <>
            <div><Toaster
                position="top-center"
                reverseOrder={false}
                />
            </div>
            <div className='flex flex-col p-5 '>
                <div className=" ml-5">
                    <ProductsFilter categories={categoriesList} />
                </div>
            
                <div className= "grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 text-center">
                    {isProductLoading ? (
                        <div className='col-span-4 flex justify-center items-center h-full'>
                            <Grid
                                visible={true}
                                height="80"
                                width="80"
                                color="#1976d2"
                                ariaLabel="grid-loading"
                                radius="12.5"
                                wrapperStyle={{}}
                                wrapperClass="grid-wrapper"
                            />
                        </div>
                    ) : isProductError ? ( toast.error("Error Fetching Products....") ) : (
                        products.map((product, i) => (
                        <ProductCard key={i} {...product} />
                        ))
                    )}
                 </div>
                 <div className='flex justify-center items-center my-10'>
                    <Paginations 
                        totalPages={pagination.totalPages}
                        currentPage={currentPage}
                        onChange={handlePageChange}/>
                 </div>
            </div>
            </>
      
    );
}



export default Products;