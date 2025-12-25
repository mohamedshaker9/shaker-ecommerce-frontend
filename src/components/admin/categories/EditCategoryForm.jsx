import React from 'react';
import {  useForm } from 'react-hook-form';
import api from '../../../api';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import InputField from '../../../shared/InputField.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import {fetchCategories} from '../../../index.js';

function EditCategoryForm({selectedCategory, setSelectedCategory, setIsOpen, setUpdateRowStatus}) {
    
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
       
    }, [dispatch] );




    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                name: selectedCategory?.name || '',
                
            }
        }
    );
    

    const onSubmit = async (data) => {
        try {
            const categoryUrl = selectedCategory && selectedCategory.id ?
             `/admin/categories/${selectedCategory.id}` : `/admin/categories`;

            console.log("Submitting category data:", data);
            console.log("Selected category:", selectedCategory);
            let response = '';
            if (selectedCategory && selectedCategory.id) {
                 response = await api.put(categoryUrl, data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}`,
                }});
                
            } else {
                console.log("Adding new category");
                 response = await api.post(categoryUrl, data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}`,
                }});
            }

            if (!response.status === 201 || !response.status === 200) {
                throw new Error('Network response was not ok');
            }
          
            setSelectedCategory(response.data);
            setUpdateRowStatus(response.data.id);
    
            toast.success('Category saved successfully!');
            setIsOpen(false);
        } catch (error) {
            console.error('Error saving category:', error);
            toast.error('Failed to save category. Please try again.');
        }
    };



  return (
     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
             {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        
            <InputField
                id="name"
                label="Category Name"
                type="text"
                errors={errors}
                register={register}
                required
                message="Category name is required"
                className="w-full"
                placeholder="Add category name"
                
            />    
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Save Category
            </button>
        </form>
  )
}

export default EditCategoryForm;