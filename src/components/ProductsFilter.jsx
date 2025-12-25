import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { use } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { LineWave } from 'react-loader-spinner';  

export default function ProductsFilter({categories}) {


  const isCategoriesLoading = useSelector((state) => state.categories.isCategoriesLoading);
  const isCategoriesError = useSelector((state) => state.categories.isCategoriesError);
    

  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState('ALL');
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [sortBy, setSortBy] = React.useState("price");
 
  
  const [searchParam, setSearchParam] = useSearchParams();
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
 


  useEffect(() => {
    const currentCategory = searchParam.get("category") || "ALL";
    const currentSearchTerm = searchParam.get("q") || "";
    const currentSortBy = searchParam.get("sortBy") || "price";
    const currentSortOrder = searchParam.get("sortOrder") || "asc";

    
    setCategory(currentCategory);
    setSearchTerm(currentSearchTerm);
    setSortBy(currentSortBy)
    setSortOrder(currentSortOrder);

  }, [searchParam]);


  const handleCategoryChange = (event) => {
    const params = new URLSearchParams(searchParam);
    const selectedCategory = event.target.value;

    if (selectedCategory === "ALL") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    
    setSearchParam(params);
  }


  useEffect(() => {
  const timeout = setTimeout(() => {
    const params = new URLSearchParams(searchParam);
    if (!searchTerm.trim()) {
      params.delete("q");
      console.log("Empty search term, removing 'q' parameter");
    } else {
      params.set("q", searchTerm);
      console.log(`Setting 'q' parameter to: ${searchTerm}`);
    }
    
    setSearchParam(params);
    
    return clearTimeout(timeout);
  }, 0); 

  return () => clearTimeout(timeout);
}, [searchParam, searchTerm, pathName, navigate]);

const toggleSortByPrice = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setSortByPrice("price")
  }

  const handleSortBy = () => {
    const params = new URLSearchParams(searchParam);
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    params.set("sortOrder", newSortOrder);
    params.set("sortBy", "price");
    setSearchParam(params);
    toggleSortByPrice();
  }

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategory('ALL');
    setSortBy('price');
    setSortOrder('');
    navigate(pathName);
  }



  return (

    <div className='flex flex-col h-full gap-10 sm:flex-row sm:justify-between sm:items-center m-auto p-5'>
      <div className="min-w-[6px]">
          <FormControl variant="standard">
            
            <Input placeholder="Search Products..."
              className="pl-5 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="input-with-icon-adornment"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
      </div>
      <div className='flex justify-content:end flex-col h-50 gap-10 sm:flex-row sm:justify-between sm:items-center p-5'>
        <div className="w-50">
          {   isCategoriesLoading ? (
                 <LineWave
                    visible={true}
                    height="100"
                    width="100"
                    color="#1976d2"
                    ariaLabel="line-wave-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    firstLineColor=""
                    middleLineColor=""
                    lastLineColor=""
                    />
              ) : isCategoriesError ?(
                <p>Error loading categories</p> ) : (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Category"
                      onChange={handleCategoryChange}
                    >
                      <MenuItem value="ALL">ALL</MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                      ))}
                    </Select>
                </FormControl>)
          }
            
            </div>
            <div tooltip="Sort By price Ascending">
              <Button variant="contained" color="primary" className="w-30 h-12" onClick={handleSortBy}>Sort By 
                {sortOrder === "asc" ? <FiArrowUp size={20}/> : <FiArrowDown size={20}/>}
              </Button>
            </div>
            <div>
              <Button variant="outlined" color="secondary" className="w-30 h-12" onClick={handleResetFilters}>Clear Filters</Button>
            </div>
        </div>
      
    </div>
    
      
    
  );
}