import { use, useEffect } from "react"
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../index.js";

const useProductsFilter = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(searchParam);
    
    const queryString = params.toString();
    console.log("Query String in useProductsFilter:",queryString);
    dispatch(fetchProducts(queryString));
  }
    ,[dispatch, searchParam]);

}

export { useProductsFilter };