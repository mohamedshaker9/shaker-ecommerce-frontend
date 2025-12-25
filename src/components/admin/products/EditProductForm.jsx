import React from 'react';
import { set, useForm } from 'react-hook-form';
import api from '../../../api';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import InputField from '../../../shared/InputField.jsx';
import { useState } from 'react';
import SelectTextField from '../../../shared/SelectTextField.jsx';
import { useEffect } from 'react';
import {fetchCategories} from '../../../index.js';
import { useSelector } from 'react-redux';

function EditProductForm({selectedProduct, setSelectedProduct, setIsOpen, setUpdateRowStatus}) {
    
    const categories = useSelector((state) => state.categories.categories);
    const [selectedCategory, setSelectedCategory] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
       
    }, [dispatch] );

    useEffect(() => {
        if(categories && categories.length === 0) return;
        if (selectedProduct) {
            const category = categories.find(cat => cat.id
                 === selectedProduct.categoryId);
            setSelectedCategory(category);
        } else {
            setSelectedCategory(categories[0]);
        } 
    }, [categories, selectedProduct] );


    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                productName: selectedProduct?.productName || '',
                price: selectedProduct?.price || '',
                quantity: selectedProduct?.quantity || '',
                discount: selectedProduct?.discount || '',
                specialPrice: selectedProduct?.specialPrice || '',
                description: selectedProduct?.description || '',
            }
        }
    );
    

    const onSubmit = async (data) => {
        try {
            const productUrl = selectedProduct && selectedProduct.id ?
             `/admin/products/${selectedProduct.id}` : `/admin/category/${selectedCategory?.id}/product`;

            console.log("Submitting product data:", data);
            
            let response = '';
            if (selectedProduct && selectedProduct.id) {
                 response = await api.put(productUrl, data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}`,
                }});
                
            } else {
                 response = await api.post(productUrl, data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}`,
                }});
            }
            console.log("Response:", response);

            if (!response.status === 201 || !response.status === 200) {
                throw new Error('Network response was not ok');
            }
          
            setSelectedProduct(response.data);
            setUpdateRowStatus(response.data.id);
    
            toast.success('Product saved successfully!');
            setIsOpen(false);
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error('Failed to save product . Please try again.');
        }
    };



  return (
     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
             {errors.addressType && <span className="text-red-500 text-sm">{errors.addressType.message}</span>}
        
            <InputField
                id="productName"
                label="Product Name"
                type="text"
                errors={errors}
                register={register}
                required
                message="Product name is required"
                className="w-full"
                placeholder="Add product name"
                
            />
           {!(selectedProduct?.id) && (
                <SelectTextField
                    options={categories}
                    selected={selectedCategory}
                    setSelected={setSelectedCategory}
                     label="Category"
                />
)}
            
            
            <div className="flex flex-row justify-between gap-8">
                <InputField
                    id="price"
                    label="Price"
                    type="number"
                    errors={errors}
                    register={register}
                    required
                    message="Price is required"
                    className="w-full"
                    placeholder="Add product price"
                    step="0.01"
                    
                />
                <InputField
                    id="quantity"
                    label="Quantity"
                    type="number"
                    errors={errors}
                    register={register}
                    required
                    message="Quantity is required"
                    className="w-full"
                    placeholder="Add product quantity"
                    
                />
            </div>

            <div className="flex flex-row justify-between gap-8">
                <InputField
                    id="discount"
                    label="Discount"
                    type="number"
                    errors={errors}
                    register={register}
                    required
                    message="Discount is required"
                    className="w-full"
                    placeholder="Add product discount"
                     step="0.01"
                
                />
                <InputField
                    id="specialPrice"
                    label="Special Price"
                    type="number"
                    errors={errors}
                    register={register}
                    required
                    message="Special Price is required"
                    className="w-full"
                    placeholder="Add special price"
                    step="0.01"
                
                />
            </div>
            <InputField
                id="description"
                label="Description"
                type="text"
                errors={errors}
                register={register}
                required
                message="Description is required"
                className="w-full"
                placeholder="Add product description"
                textarea={true}
              
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Save Product
            </button>
        </form>
  )
}

export default EditProductForm;